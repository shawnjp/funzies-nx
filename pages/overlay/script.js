// Existing code to cycle through kitty names
const kittyNames = ["Wade Wilson", "Harleykins", "Logan Beanz"];
let currentNameIndex = 0;

function cycleKittyNames() {
    const kittyNamesDiv = document.getElementById('kittyNames');
    if (kittyNamesDiv) {
        kittyNamesDiv.innerHTML = kittyNames[currentNameIndex];
        currentNameIndex = (currentNameIndex + 1) % kittyNames.length;
    }
}

setInterval(cycleKittyNames, 3000); // Change name every 3 seconds

// Function to toggle break panel visibility
function toggleBreakPanel() {
    const breakPanel = document.getElementById('topicPanel');
    if (breakPanel) {
        breakPanel.style.display = (breakPanel.style.display === 'none' ? 'block' : 'none');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const topicPanel = document.getElementById('topicPanel');
    const scheduleAnnouncement = document.getElementById('scheduleAnnouncement');

    if (topicPanel) {
        topicPanel.addEventListener('input', function() {
            localStorage.setItem('topicText', this.innerHTML);
        });
        if (localStorage.getItem('topicText')) {
            topicPanel.innerHTML = localStorage.getItem('topicText');
        }
    }

    if (scheduleAnnouncement) {
        scheduleAnnouncement.addEventListener('input', function() {
            localStorage.setItem('scheduleText', this.innerHTML);
        });
        if (localStorage.getItem('scheduleText')) {
            scheduleAnnouncement.innerHTML = localStorage.getItem('scheduleText');
        }
    }
});
