chrome.identity.getAuthToken({interactive: false}, (token) => {
    const status = document.getElementById('oauth-status');
    if (token) {
      status.textContent = 'Authorized ✅';
      status.style.color = '#4CAF50';
    } else {
      status.textContent = 'Not Authorized ❌';
      status.style.color = '#F44336';
    }
  });
  
  document.getElementById('auth-button').addEventListener('click', () => {
    chrome.identity.getAuthToken({interactive: true}, (token) => {
      if (token) {
        window.close(); // Close popup after auth
      }
    });
  });