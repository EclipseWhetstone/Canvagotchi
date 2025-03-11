const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let happiness = 50;

// Canvas setup
canvas.style.position = 'fixed';
canvas.style.top = '20px';
canvas.style.right = '20px';
canvas.style.zIndex = '9999';
canvas.width = 150;
canvas.height = 200;
document.body.appendChild(canvas);

// Happiness decay
setInterval(() => {
  happiness = Math.max(happiness - 2, 0);
  drawTomogotchi();
}, 60000);

// Message listener
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'submission') {
    happiness = Math.min(happiness + 20, 100);
    drawTomogotchi();
  }
});

function drawTomogotchi() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw happiness bar
  ctx.fillStyle = '#e0e0e0';
  ctx.fillRect(20, 10, 110, 15);
  ctx.fillStyle = happiness > 50 ? '#4CAF50' : happiness > 25 ? '#FFC107' : '#F44336';
  ctx.fillRect(20, 10, (happiness / 100) * 110, 15);

  // Draw Tomogotchi body
  ctx.beginPath();
  ctx.arc(75, 100, 40, 0, Math.PI * 2);
  ctx.fillStyle = '#FFCDD2';
  ctx.fill();

  // Draw eyes
  ctx.beginPath();
  ctx.arc(60, 85, 8, 0, Math.PI * 2);
  ctx.arc(90, 85, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#212121';
  ctx.fill();

  // Draw mouth
  ctx.beginPath();
  if (happiness > 70) {
    ctx.arc(75, 110, 20, 0.2 * Math.PI, 0.8 * Math.PI);
  } else if (happiness > 30) {
    ctx.moveTo(60, 110);
    ctx.lineTo(90, 110);
  } else {
    ctx.arc(75, 120, 20, 1.2 * Math.PI, 1.8 * Math.PI);
  }
  ctx.strokeStyle = '#212121';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Initial draw
drawTomogotchi();