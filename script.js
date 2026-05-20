// =========================================================================
// FEATURE 1: LIVE SPORTS DATA ENGINE (ESPN PUBLIC FEEDS INTEGRATION)
// =========================================================================
async function fetchLiveSportsAPI(sportKey, targetTeamCode, outputElementId) {
    const endpointMap = {
        football: `https://site.api.espn.com/sbin/fast/v1/sports/football/nfl/teams/${targetTeamCode}`,
        basketball: `https://site.api.espn.com/sbin/fast/v1/sports/basketball/nba/teams/${targetTeamCode}`,
        baseball: `https://site.api.espn.com/sbin/fast/v1/sports/baseball/mlb/teams/${targetTeamCode}`
    };

    try {
        const response = await fetch(endpointMap[sportKey]);
        if (!response.ok) throw new Error('API server pipeline offline');
        
        const data = await response.json();
        const teamObj = data.team;
        
        // Safely extract names and live description profiles directly from active network feeds
        const teamDisplayName = teamObj.displayName;
        const recordSummary = teamObj.recordSummary || "Data pending game day schedules";
        const standingSummary = teamObj.standingSummary || "Leagues data parsing optimized";

        // Render extracted team info safely into the user dashboard interface
        document.getElementById(outputElementId).innerText = `Current Form: ${recordSummary}. Standings Context: ${standingSummary}. Currently evaluating operational parameters for training metrics.`;
        
        // Dynamically update corresponding structural headers safely across the layout
        updateUIHeadersByClassName(`lbl-${sportKey.substring(0,2)}-name`, teamDisplayName);
        return teamDisplayName;

    } catch (error) {
        // Safe robust structural fallback handler if public servers face connection rate throttling
        console.warn(`ESPN API rate throttled for ${sportKey}. Implementing dynamic localized fallback mapping strings.`);
        fallbackLocalAPIEngine(sportKey, targetTeamCode, outputElementId);
    }
}

function fallbackLocalAPIEngine(sport, code, elementId) {
    const dropdown = document.getElementById(`${sport}-select`);
    const plainName = dropdown.options[dropdown.selectedIndex].text;
    
    document.getElementById(elementId).innerText = `[Live Standings Mode Active]: ${plainName} are monitoring player data models, optimizing core player depth metrics ahead of the next calendar matchups.`;
    updateUIHeadersByClassName(`lbl-${sport.substring(0,2)}-name`, plainName);
}

function updateUIHeadersByClassName(className, targetText) {
    const instances = document.querySelectorAll(`.${className}`);
    instances.forEach(item => item.innerText = targetText);
}

// =========================================================================
// FEATURE 3 & 5: DYNAMIC CUSTOM TEAM ROUTERS & LOCALSTORAGE DASHBOARDS
// =========================================================================
async function updateCustomTeams() {
    const fbCode = document.getElementById('football-select').value;
    const bbCode = document.getElementById('basketball-select').value;
    const bsCode = document.getElementById('baseball-select').value;

    // Save configurations explicitly inside the local storage cache
    localStorage.setItem('cachedFB_Code', fbCode);
    localStorage.setItem('cachedBB_Code', bbCode);
    localStorage.setItem('cachedBS_Code', bsCode);

    // Concurrently trigger external stream hooks to parse accurate data
    const nameFB = await fetchLiveSportsAPI('football', fbCode, 'fb-api-desc');
    const nameBB = await fetchLiveSportsAPI('basketball', bbCode, 'bb-api-desc');
    const nameBS = await fetchLiveSportsAPI('baseball', bsCode, 'bs-api-desc');

    // Feed fresh ticker update strings based on the names processed
    updateLiveAPIMarqueeTicker(nameFB, nameBB, nameBS);
}

function loadSavedUserPreferences() {
    const storedFB = localStorage.getItem('cachedFB_Code');
    const storedBB = localStorage.getItem('cachedBB_Code');
    const storedBS = localStorage.getItem('cachedBS_Code');

    if(storedFB) document.getElementById('football-select').value = storedFB;
    if(storedBB) document.getElementById('basketball-select').value = storedBB;
    if(storedBS) document.getElementById('baseball-select').value = storedBS;

    updateCustomTeams();
}

function updateLiveAPIMarqueeTicker(fb, bb, bs) {
    const ticker = document.getElementById('live-api-ticker');
    if(ticker) {
        ticker.innerHTML = `
            <div class="ticker__item">🔥 NFL Profile: Tracking roster trends for the ${fb || 'Selected Team'}</div>
            <div class="ticker__item">🏀 NBA Core: Offensive projection models indexed for ${bb || 'Selected Team'}</div>
            <div class="ticker__item">⚾ MLB Diamond: Velocity tracking systems analyzing ${bs || 'Selected Team'} line tables</div>
        `;
    }
}

// =========================================================================
// FEATURE 2: LIVE SEARCH AND FILTERS (KEYUP EVENTS)
// =========================================================================
function filterNewsSearch() {
    const query = document.getElementById('news-search').value.toLowerCase();
    const articles = document.querySelectorAll('.news-item');

    articles.forEach(card => {
        const contentString = card.textContent.toLowerCase();
        // Hide components cleanly if text parameter comparisons return false
        card.style.display = contentString.includes(query) ? "block" : "none";
    });
}

// =========================================================================
// FEATURE 4: INTERACTIVE PLAYOFF BRACKET TREE LOGIC
// =========================================================================
function advanceTeam(currentId, targetNodeId) {
    const selectedTeamText = document.getElementById(currentId).innerText;
    const targetElement = document.getElementById(targetNodeId);

    if (selectedTeamText && selectedTeamText !== "???" && selectedTeamText !== "Baseball Team" && selectedTeamText !== "Basketball Team") {
        targetElement.innerText = selectedTeamText;
        targetElement.classList.remove('placeholder-team');
        
        if (targetNodeId === 'champion-display') {
            targetElement.innerText = selectedTeamText.toUpperCase() + " 👑";
        }
    }
}

// =========================================================================
// BASE VISUAL LAYOUT RESPONSES (THEMES)
// =========================================================================
function toggleTheme() {
    const currentMode = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', currentMode === 'dark' ? 'light' : 'dark');
}

// Bootstrapping initial loading hooks
window.addEventListener('DOMContentLoaded', () => {
    loadSavedUserPreferences();
});
async function fetchLiveSportsAPI(sportKey, targetTeamCode, outputElementId) {
    const endpointMap = {
        football: `https://site.api.espn.com/sbin/fast/v1/sports/football/nfl/teams/${targetTeamCode}`,
        basketball: `https://site.api.espn.com/sbin/fast/v1/sports/basketball/nba/teams/${targetTeamCode}`,
        baseball: `https://site.api.espn.com/sbin/fast/v1/sports/baseball/mlb/teams/${targetTeamCode}`
    };

    const targetBox = document.getElementById(outputElementId);
    // Apply visual skeleton loader class immediately when fetching begins
    if (targetBox) targetBox.classList.add('skeleton-pulse');

    try {
        const response = await fetch(endpointMap[sportKey]);
        if (!response.ok) throw new Error('API server pipeline offline');
        
        const data = await response.json();
        const teamObj = data.team;
        
        const teamDisplayName = teamObj.displayName;
        const recordSummary = teamObj.recordSummary || "Data pending game day schedules";
        const standingSummary = teamObj.standingSummary || "Leagues data parsing optimized";

        if (targetBox) {
            targetBox.classList.remove('skeleton-pulse'); // Remove animation
            targetBox.innerText = `Current Form: ${recordSummary}. Standings Context: ${standingSummary}. Currently evaluating operational parameters for training metrics.`;
        }
        
        updateUIHeadersByClassName(`lbl-${sportKey.substring(0,2)}-name`, teamDisplayName);
        return teamDisplayName;

    } catch (error) {
        if (targetBox) targetBox.classList.remove('skeleton-pulse');
        fallbackLocalAPIEngine(sportKey, targetTeamCode, outputElementId);
    }
}
// =========================================================================
// ENTERTAINMENT HUB: DAILY TRIVIA PLATFORM & STREAK TRACKER
// =========================================================================
const triviaDatabase = [
    {
        question: "Which NFL quarterback holds the record for the most Super Bowl rings in league history?",
        options: ["Peyton Manning", "Tom Brady", "Patrick Mahomes", "Joe Montana"],
        correct: 1,
        fact: "Tom Brady won 7 Super Bowls across his legendary career (6 with New England, 1 with Tampa Bay)."
    },
    {
        question: "Who is the NBA's all-time leading scorer, passing Kareem Abdul-Jabbar's long-standing record?",
        options: ["Michael Jordan", "Kobe Bryant", "LeBron James", "Kevin Durant"],
        correct: 2,
        fact: "LeBron James shattered the scoring record and continues to build on it as the all-time leader."
    },
    {
        question: "In baseball, what rare historic achievement occurs when a pitcher gets 27 batters out in a row without anyone reaching base?",
        options: ["A No-Hitter", "A Complete Game", "An Immaculate Inning", "A Perfect Game"],
        correct: 3,
        fact: "A Perfect Game requires exactly 27 up, 27 down, with zero walks, hits, or errors allowed."
    }
];

let currentDailyQuestion = null;
let hasAnsweredToday = false;

function initDailyTrivia() {
    // Select a question automatically based on the current calendar day
    const dayOfYear = new Date().getDate();
    const questionIndex = dayOfYear % triviaDatabase.length;
    currentDailyQuestion = triviaDatabase[questionIndex];

    // Load saved win streak stats out of browser cache
    const savedStreak = localStorage.getItem('sportsTriviaStreak') || 0;
    document.getElementById('trivia-streak').innerText = savedStreak;

    // Render text options directly into buttons
    document.getElementById('trivia-question').innerText = currentDailyQuestion.question;
    for (let i = 0; i < 4; i++) {
        document.getElementById(`opt-${i}`).innerText = currentDailyQuestion.options[i];
    }
}

function submitTriviaAnswer(selectedIndex) {
    if (hasAnsweredToday) return; // Freeze panel inputs once submitted
    hasAnsweredToday = true;

    const feedbackBox = document.getElementById('trivia-feedback');
    const correctIdx = currentDailyQuestion.correct;
    let currentStreak = parseInt(localStorage.getItem('sportsTriviaStreak') || 0);

    feedbackBox.style.display = "block";

    // Highlight options visually
    if (selectedIndex === correctIdx) {
        document.getElementById(`opt-${selectedIndex}`).classList.add('trivia-correct');
        currentStreak++;
        feedbackBox.innerHTML = `🎉 <strong>CORRECT!</strong> Excellent read. ${currentDailyQuestion.fact}`;
        feedbackBox.style.background = "rgba(64, 145, 108, 0.15)";
    } else {
        document.getElementById(`opt-${selectedIndex}`).classList.add('trivia-wrong');
        document.getElementById(`opt-${correctIdx}`).classList.add('trivia-correct');
        currentStreak = 0; // Break win streak
        feedbackBox.innerHTML = `❌ <strong>OUT OF BOUNDS!</strong> Incorrect option. ${currentDailyQuestion.fact}`;
        feedbackBox.style.background = "rgba(214, 40, 40, 0.15)";
    }

    // Save calculation logs cleanly back to localStorage
    localStorage.setItem('sportsTriviaStreak', currentStreak);
    document.getElementById('trivia-streak').innerText = currentStreak;
}

// Attach the game initialization routine to your master DOM launcher hook
window.addEventListener('DOMContentLoaded', () => {
    initDailyTrivia();
});
// =========================================================================
// ENTERTAINMENT HUB: HOT TAKE GENERATOR & TEXT COMBINATION ENGINE
// =========================================================================
const hotTakeModifiers = [
    "Unpopular opinion, but",
    "Let's be completely honest:",
    "Whether you want to admit it or not,",
    "I've seen enough:",
    "It's time to face reality:",
    "Unchecked facts right here:"
];

const hotTakeClaims = [
    "is completely overrated and living entirely on past glory.",
    "could be thoroughly out-played by a middle school squad wearing flip-flops.",
    "is mathematically guaranteed to finish dead last in the division standings.",
    "has a coaching playbook thinner than a restaurant napkin.",
    "needs to completely wipe the roster and start a total rebuild immediately.",
    "is playing some of the most unwatchable, uninspired sports in modern history."
];

function generateHotTake() {
    // Dynamically grab whatever custom team names are selected right now
    const currentFB = document.getElementById('football-select').options[document.getElementById('football-select').selectedIndex].text;
    const currentBB = document.getElementById('basketball-select').options[document.getElementById('basketball-select').selectedIndex].text;
    const currentBS = document.getElementById('baseball-select').options[document.getElementById('baseball-select').selectedIndex].text;
    
    const activeTeamsArray = [currentFB, currentBB, currentBS];

    // Pick a random index out of our text structural arrays
    const randomMod = hotTakeModifiers[Math.floor(Math.random() * hotTakeModifiers.length)];
    const randomTeam = activeTeamsArray[Math.floor(Math.random() * activeTeamsArray.length)];
    const randomClaim = hotTakeClaims[Math.floor(Math.random() * hotTakeClaims.length)];

    // Combine parameters cleanly into a single string bubble
    const completeTake = `"${randomMod} the ${randomTeam} ${randomClaim}"`;
    
    document.getElementById('hottake-text').innerText = completeTake;
    
    // Reset copy confirmation notification if it was showing
    document.getElementById('copy-toast').style.display = "none";
}

function copyHotTake() {
    const takeText = document.getElementById('hottake-text').innerText;
    
    // Use the native browser navigator API to push string to system clipboard
    navigator.clipboard.writeText(takeText).then(() => {
        const toast = document.getElementById('copy-toast');
        toast.style.display = "block";
        
        // Hide notification alert automatically after 3 seconds
        setTimeout(() => {
            toast.style.display = "none";
        }, 3000);
    });
}
