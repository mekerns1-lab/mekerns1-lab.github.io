// ==========================================
// FEATURE 1: DARK / LIGHT THEME TOGGLE ENGINE
// ==========================================
function toggleTheme() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'light');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
    }
}

// ==========================================
// FEATURE 2: SIDEBAR RUNTIME COUNTDOWN TIMER
// ==========================================
function runCountdown() {
    // Target Date: First Thursday of September 2026 (Approx Sept 3)
    const targetDate = new Date("September 3, 2026 20:00:00").getTime();

    setInterval(function() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        // Time calculations for days, hours, minutes, and seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Render values directly to HTML DOM Elements safely
        if (document.getElementById("days")) {
            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }, 1000);
}
// Initialize the clock execution loop at structural load window
window.onload = runCountdown;

// ==========================================
// FEATURE 3: INTERACTIVE SCORE PREDICTOR ENGINE
// ==========================================
function checkPrediction(event) {
    event.preventDefault();
    const score1 = parseInt(document.getElementById('team1Score').value);
    const score2 = parseInt(document.getElementById('team2Score').value);
    const outputBox = document.getElementById('predictionResult');

    outputBox.style.display = "block";
    
    if (score1 > score2) {
        outputBox.innerHTML = `🔮 Prediction Locked: You have the <strong>Dodgers</strong> winning by ${score1 - score2}!`;
    } else if (score2 > score1) {
        outputBox.innerHTML = `🔮 Prediction Locked: You have the <strong>Yankees</strong> winning by ${score2 - score1}!`;
    } else {
        outputBox.innerHTML = `🔮 Prediction Locked: You're projecting a gritty <strong>Tie Game</strong>!`;
    }
}

// ==========================================
// FEATURE 4: DYNAMIC LEADERBOARD SWITCHER TABS
// ==========================================
function switchLeaderboard(sportKey) {
    // Clean and reset active header tag states
    const tabs = document.querySelectorAll('.stat-tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Hide all lists cleanly
    const lists = document.querySelectorAll('.leader-list');
    lists.forEach(list => list.style.display = 'none');

    // Reveal selected target explicitly
    document.getElementById(`${sportKey}-leaders`).style.display = 'block';
}

// ==========================================
// FEATURE 5: CUSTOM TEAM COLOR CSS SKINNING
// ==========================================
function changeTeamTheme(teamName) {
    const root = document.documentElement;

    if (teamName === 'seahawks') {
        root.style.setProperty('--accent-color', '#69be28'); // Neon lime green
        root.style.setProperty('--card-bg', '#002244');     // College Navy
    } else if (teamName === 'thunder') {
        root.style.setProperty('--accent-color', '#ef3b24'); // Sunset Orange
        root.style.setProperty('--card-bg', '#007ac1');     // Thunder Blue
    } else if (teamName === 'dodgers') {
        root.style.setProperty('--accent-color', '#005a9c'); // Dodgers Royal Blue
        root.style.setProperty('--card-bg', '#e3f2fd');     // Powder layout tint overlay
    } else {
        // Reset back to Global Variable Standards default CSS mapping
        root.style.removeAttribute('style');
    }
}
