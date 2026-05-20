// ==========================================
// FEATURE 1: SPORTS LIVE DATA API SIMULATION
// ==========================================
function simulateLiveSportsAPI() {
    const tickerContainer = document.getElementById('live-api-ticker');
    
    // An array simulating fresh incoming data streams parsed via public sport web-servers
    const mockFeedData = [
        "🏈 NFL SCORES: Seahawks defeat Patriots 29-13 in Super Bowl LX matchup",
        "🏀 NBA SCORES: Thunder down Pacers 103-91 to cap historic postseason championship run",
        "⚾ MLB SCORES: Dodgers outlast Blue Jays 5-4 in an 11-inning Game 7 thriller",
        "📢 NEWS FLASH: Mid-season baseball rosters locked ahead of summer classic scheduling"
    ];

    let currentIndex = 0;

    // Loop changes ticker updates dynamically every 6 seconds to show data processing
    setInterval(() => {
        if(tickerContainer) {
            tickerContainer.innerHTML = `<div class="ticker__item">${mockFeedData[currentIndex]}</div>`;
            currentIndex = (currentIndex + 1) % mockFeedData.length;
        }
    }, 6000);
}

// ==========================================
// FEATURE 2: REAL-TIME NEWS FEED FILTER/SEARCH
// ==========================================
function filterNewsSearch() {
    const searchQuery = document.getElementById('news-search').value.toLowerCase();
    const articles = document.querySelectorAll('.news-item');

    articles.forEach(article => {
        const textContent = article.textContent.toLowerCase();
        // Check if user search string parameters fit the profile text blocks
        if (textContent.includes(searchQuery)) {
            article.style.display = "block";
        } else {
            article.style.display = "none";
        }
    });
}

// ==========================================
// FEATURE 3: USER LOCALSTORAGE PREFERENCE HUB
// ==========================================
function savePreference(selectedSport) {
    // Write preference variable directly to browser database cache
    localStorage.setItem('userSportPreference', selectedSport);
    applySportFiltering(selectedSport);
}

function applySportFiltering(sportValue) {
    const articles = document.querySelectorAll('.news-item');
    
    articles.forEach(card => {
        const cardSport = card.getAttribute('data-sport');
        if (sportValue === 'all' || cardSport === sportValue) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function loadSavedUserPreferences() {
    const savedSport = localStorage.getItem('userSportPreference');
    if (savedSport) {
        // Toggle the correct radio button interface state to keep UX matching
        const radioTarget = document.querySelector(`input[name="fav-sport"][value="${savedSport}"]`);
        if (radioTarget) radioTarget.checked = true;
        applySportFiltering(savedSport);
    } else {
        applySportFiltering('all');
    }
}

// ==========================================
// FEATURE 4: INTERACTIVE PLAYOFF BRACKET TREE
// ==========================================
function advanceTeam(clickedId, targetRoundId) {
    const selectedTeamText = document.getElementById(clickedId).innerText;
    const targetSlot = document.getElementById(targetRoundId);

    if (selectedTeamText !== "???") {
        targetSlot.innerText = selectedTeamText;
        targetSlot.classList.remove('placeholder-team');
        
        // If updating the finals round, notify the user which team won the championship banner
        if (targetRoundId === 'champion-display') {
            targetSlot.innerText = selectedTeamText.toUpperCase() + " 🔥";
        }
    }
}

// ==========================================
// CORE GLOBAL CLOCK & RUNTIME SETUP ENGINES
// ==========================================
function toggleTheme() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-theme');
    htmlElement.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
}

function runCountdownClock() {
    const targetDate = new Date("September 3, 2026 20:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (document.getElementById("days")) {
            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }, 1000);
}

function checkPrediction(event) {
    event.preventDefault();
    const score1 = parseInt(document.getElementById('team1Score').value);
    const score2 = parseInt(document.getElementById('team2Score').value);
    const outputBox = document.getElementById('predictionResult');

    outputBox.style.display = "block";
    if (score1 > score2) {
        outputBox.innerHTML = `🔮 Prediction Locked: Dodgers win by ${score1 - score2}!`;
    } else if (score2 > score1) {
        outputBox.innerHTML = `🔮 Prediction Locked: Yankees win by ${score2 - score1}!`;
    } else {
        outputBox.innerHTML = `🔮 Prediction Locked: Draw game projected!`;
    }
}

// Master execution launcher hook
window.addEventListener('DOMContentLoaded', () => {
    runCountdownClock();
    simulateLiveSportsAPI();
    loadSavedUserPreferences();
});
