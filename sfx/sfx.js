class RetroSFX {
    constructor() {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  
    playTone(freq, type='square', duration=0.2) {
      const oscillator = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
  
      oscillator.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      
      oscillator.start();
      oscillator.stop(this.ctx.currentTime + duration);
    }
  
    // Predefined SFX
    happy() {
      this.playTone(523.25); // C5
      this.playTone(659.25, 'square', 0.3); // E5
    }
  
    sad() {
      this.playTone(220.00, 'sine', 0.5); // A3
      this.playTone(196.00, 'sine', 0.5); // G3
    }
  
    select() {
      this.playTone(784.00, 'square', 0.1); // G5
    }
  
    sparkle() {
      [1318.51, 1567.98, 2093.00].forEach((freq, i) => { // E6, G6, C7
        setTimeout(() => this.playTone(freq, 'square', 0.1), i * 50);
      });
    }
  }
