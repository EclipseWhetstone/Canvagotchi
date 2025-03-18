const canvas = document.createElement('canvas');
const listContainer = document.createElement('div');
const ctx = canvas.getContext('2d');
let happiness = 50;
let streak = 0;
let lastFedDate = null;

// Animation System Variables
const birdFrames = [];
let currentFrame = 0;
let isCelebrating = false;
let imagesLoaded = false;

// Animation Timing
const NORMAL_FRAME_INTERVAL = 100; // 100ms = ~10fps
const CELEBRATION_FRAME_INTERVAL = 50; // 50ms = ~20fps
const FRAME_SKIP = 2; // Show every 3rd frame

// SFX System
const sfx = {
  select: new Audio(chrome.runtime.getURL('sfx/select.wav')),
  happy: new Audio(chrome.runtime.getURL('sfx/happy.wav')),
  sad: new Audio(chrome.runtime.getURL('sfx/sad.wav')),
  sparkle: new Audio(chrome.runtime.getURL('sfx/sparkle.wav'))
};

// Canvas Setup
canvas.style.position = 'fixed';
canvas.style.top = '20px';
canvas.style.right = '20px';
canvas.style.zIndex = '9999';
canvas.width = 300;
canvas.height = 300;
canvas.style.cursor = 'grab'; // Initial cursor style
document.body.appendChild(canvas);

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

canvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - canvas.offsetLeft;
  offsetY = e.clientY - canvas.offsetTop;
  canvas.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    canvas.style.left = `${e.clientX - offsetX}px`;
    canvas.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  canvas.style.cursor = 'grab';
});

// Touch Events for Mobile
canvas.addEventListener('touchstart', (e) => {
  isDragging = true;
  offsetX = e.touches[0].clientX - canvas.offsetLeft;
  offsetY = e.touches[0].clientY - canvas.offsetTop;
  canvas.style.cursor = 'grabbing';
});

document.addEventListener('touchmove', (e) => {
  if (isDragging) {
    e.preventDefault();
    canvas.style.left = `${e.touches[0].clientX - offsetX}px`;
    canvas.style.top = `${e.touches[0].clientY - offsetY}px`;
  }
});

document.addEventListener('touchend', () => {
  isDragging = false;
  canvas.style.cursor = 'grab';
});

async function loadBirdFrames() {
  try {
    for (let i = 1; i <= 147; i++) {
      const img = new Image();
      img.src = chrome.runtime.getURL(
        `tf_animals/individual_frames/birds1/birds1_${String(i).padStart(3, '0')}.png`
      );
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error(`Failed to load frame birds1_${i}`));
      });
      
      birdFrames.push(img);
    }
    imagesLoaded = true;
    console.log('147 bird frames loaded successfully');
  } catch (error) {
    console.error('Error loading animation frames:', error);
    const fallbackImg = new Image();
    fallbackImg.src = chrome.runtime.getURL('icons/icon48.png');
    birdFrames.push(fallbackImg);
    imagesLoaded = true;
  }
}

function drawFrame() {
  if (!imagesLoaded) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  try {
    if (birdFrames[currentFrame]) {
      ctx.drawImage(
        birdFrames[currentFrame],
        0, 0,
        canvas.width, canvas.height
      );
    }
  } catch (error) {
    console.error('Error drawing frame:', error);
    drawErrorFallback();
  }
}

function drawErrorFallback() {
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(150, 150, 50, 0, Math.PI * 2);
  ctx.fill();
}

// Initialize animation system
loadBirdFrames().then(() => {
  let frameCounter = 0;
  
  setInterval(() => {
    if (!isCelebrating) {
      frameCounter++;
      if(frameCounter % FRAME_SKIP === 0) {
        currentFrame = (currentFrame + 1) % birdFrames.length;
        drawFrame();
      }
    }
  }, NORMAL_FRAME_INTERVAL);
});

chrome.runtime.sendMessage({type: 'getCalendarEvents'}, (response) => {
  if (response.events) {
    const list = document.getElementById('assignments-list');
    response.events.forEach(event => {
      const div = document.createElement('div');
      div.className = 'assignment-item';
      div.innerHTML = `
        <label style="display: block; margin: 5px 0; color: #92d4a7;">
          <input type="checkbox" data-id="${event.id}">
          ${event.summary} 
          <small style="color: #6b8cff;">${new Date(event.start.dateTime).toLocaleDateString()}</small>
        </label>
      `;
      div.querySelector('input').addEventListener('change', handleAssignmentComplete);
      list.appendChild(div);
    });
  }
});

function handleAssignmentComplete(e) {
  if (e.target.checked) {
    const today = new Date().toDateString();
    
    // Update streak
    if (lastFedDate === today) return;
    streak = lastFedDate?.getDate() === new Date().getDate() - 1 ? streak + 1 : 1;
    lastFedDate = new Date();

    // Update happiness
    happiness = Math.min(happiness + 20, 100);

    // Sound effects
    sfx.select.play().catch(console.error);
    const currentMood = happiness > 70 ? 'happy' : 
                       happiness > 40 ? 'neutral' : 
                       streak > 3 ? 'excited' : 'sad';
    
    if(currentMood === 'excited') {
      setTimeout(() => sfx.sparkle.play().catch(console.error), 300);
    } else {
      const sound = happiness > 70 ? sfx.happy : sfx.sad;
      sound.play().catch(console.error);
    }

    // Start celebration animation
    isCelebrating = true;
    let celebrationFrame = 0;
    const celebrationInterval = setInterval(() => {
      if (celebrationFrame >= birdFrames.length) {
        isCelebrating = false;
        clearInterval(celebrationInterval);
      } else {
        currentFrame = celebrationFrame;
        celebrationFrame++;
        drawFrame();
      }
    }, CELEBRATION_FRAME_INTERVAL);

    chrome.runtime.sendMessage({type: 'submission'});
    e.target.disabled = true;
  }
}

// Initial setup
drawFrame();