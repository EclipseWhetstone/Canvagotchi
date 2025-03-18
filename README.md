Canvagotchi 🐣
Canvagotchi is a retro-styled productivity companion that gamifies assignment tracking. By integrating with Google Calendar, it helps students stay on top of their coursework while caring for a digital pet. Submit assignments on time, and your pet thrives. Miss deadlines, and your pet gets sad. It’s productivity meets nostalgia!

Features ✨
Google Calendar Integration: Syncs with your Google Calendar to fetch assignments.

Retro-Styled Pet: A 16-bit digital pet that reacts to your productivity.

Assignment Tracking: View and mark assignments as completed.

Streak System: Track your consistent assignment submissions.

Sound Effects: Authentic 8-bit sounds for every interaction.

Movable Interface: Drag and drop the pet anywhere on the screen.

Customization: Change your pet’s appearance and environment.

Celebration Animations: Special effects for completing multiple assignments on time.

Installation 🛠️

Prerequisites
Google Chrome browser.

A Google account for calendar integration.

Steps
Download the Extension:

Clone this repository or download the ZIP file.

Copy
git clone https://github.com/yourusername/canvagotchi.git
Load the Extension in Chrome:

Open Chrome and go to chrome://extensions/.

Enable Developer Mode (toggle in the top-right corner).

Click Load unpacked and select the canvagotchi directory.

Authorize Google Calendar Access:

Click the Canvagotchi icon in the Chrome toolbar.

Sign in with your Google account and grant calendar access.

Usage 🎮
Sync Assignments:

Canvagotchi automatically fetches assignments from your Google Calendar.

Mark Assignments as Completed:

Check off assignments in the list to update your pet’s status.

Interact with Your Pet:

Drag the pet around the screen to move it.

Watch its mood change based on your productivity.

Celebrate Your Streaks:

Complete assignments on time to build streaks and unlock special animations.

Development 🧑‍💻
Tech Stack
Frontend: HTML, CSS, JavaScript.

Chrome Extensions API: For browser integration.

Google Calendar API: For assignment syncing.

Web Audio API: For sound effects.

File Structure
Copy
canvagotchi/
├── icons/                # Extension icons
├── sfx/                  # Sound effects
├── birds/                # Animation frames
├── css/                  # Stylesheets
│   └── retro.css         # Retro styling
├── js/                   # JavaScript files
│   ├── content.js        # Content script
│   ├── background.js     # Background script
│   └── popup.js          # Popup script (optional)
├── manifest.json         # Extension manifest
└── README.md             # This file
Testing 🧪
We conducted user testing with 25 test cases, covering all major features. Key findings:

21/25 tasks were completed intuitively.

4 tasks required minor improvements (e.g., clearer labels for advanced features).

Feedback: Users requested dark mode and mobile support.

Future Plans 🚀
Dark Mode: Add a dark theme for better usability.

Mobile Support: Develop a Progressive Web App (PWA) for mobile devices.

Social Sharing: Allow users to share their pet’s progress with friends.

Achievements: Add gamified achievements for completing tasks.

Contributing 🤝
We welcome contributions! Here’s how to get started:

Fork the repository.

Create a new branch for your feature/bugfix.

Submit a pull request with a detailed description of your changes.

License 📄
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments 🙏
Google Calendar API: For seamless assignment syncing.

Press Start 2P Font: For the retro typography.

BFXR: For generating 8-bit sound effects.
