const button = document.querySelector('.button');
const maxScoreData = document.querySelector('.max-score');
const totalClicksData = document.querySelector('.total-clicks');
const restartsData = document.querySelector('.restarts');
const achievementsPanelDisplayButton = document.querySelector('.open-panel-button');
const achievements = document.querySelector('.achievements');
const achievementNotification = document.querySelector('.achievement-notification');

let actualClicks = 0;
let totalClicks = 0;
let restarts = 0;
let maxScore = 0;
let maxScoreHistory = [];

let state = 'closed';

function loadStats() {
    const savedMax = localStorage.getItem('maxScore');
    const savedTotal = localStorage.getItem('totalClicks');
    const savedRestarts = localStorage.getItem('restarts');

    if (savedMax !== null) maxScore = Number(savedMax);
    if (savedTotal !== null) totalClicks = Number(savedTotal);
    if (savedRestarts !== null) restarts = Number(savedRestarts);

    maxScoreData.textContent = `Maximo ${maxScore}`;
    totalClicksData.textContent = `Total ${totalClicks}`;
    restartsData.textContent = `Reinicios ${restarts}`;
}
loadStats();

function saveStats() {
    localStorage.setItem('maxScore', maxScore);
    localStorage.setItem('totalClicks', totalClicks);
    localStorage.setItem('restarts', restarts);
}

function setAchievementUnlocked(achievement) {
    const achievementsMap = [
        {
            achievementData: document.querySelector('.achv-1'),
            bgColor: '#7cb859ff'
        },
        {
            achievementData: document.querySelector('.achv-2'),
            bgColor: '#5972b8ff'
        },
        {
            achievementData: document.querySelector('.achv-3'),
            bgColor: '#7e59b8ff'
        },
        {
            achievementData: document.querySelector('.achv-4'),
            bgColor: '#e9cc4aff'
        },
        {
            achievementData: document.querySelector('.achv-5'),
            bgColor: '#fd5d5dff'
        },
        {
            achievementData: document.querySelector('.achv-6'),
            bgColor: '#d16bc4ff'
        },
        {
            achievementData: document.querySelector('.achv-7'),
            bgColor: '#5e3c25ff'
        }
    ];

    const achievementChosen = achievementsMap[achievement - 1];
    achievementChosen.achievementData.style.backgroundColor = achievementChosen.bgColor;
}

function loadAchievements() {
    const achvs = [
        localStorage.getItem('achv1'),
        localStorage.getItem('achv2'),
        localStorage.getItem('achv3'),
        localStorage.getItem('achv4'),
        localStorage.getItem('achv5'),
        localStorage.getItem('achv6'),
        localStorage.getItem('achv7')
    ];

    for (let i = 0; i < achvs.length; i++) {
        if (achvs[i] !== null) {
            setAchievementUnlocked(i + 1);
        }
    }
}

loadAchievements();

function saveAchievement(achievement) {
    localStorage.setItem(`achv${achievement}`, true);
}

function restart() {
    maxScoreHistory.push(actualClicks);

    if (maxScoreHistory.length > 3) {
        maxScoreHistory.shift();
    }

    if (maxScoreHistory.length === 3 &&
        maxScoreHistory[0] === maxScoreHistory[1] &&
        maxScoreHistory[1] === maxScoreHistory[2] &&
        maxScoreHistory[0] > 0) {
            completeAchievement(7);
        }

    actualClicks = 0;
    restartsData.textContent = `Reinicios ${++restarts}`;
    button.textContent = actualClicks;
    saveStats();

    if (restarts === 10) {
        completeAchievement(6);
    }
}

function buttonOperation() {
    totalClicksData.textContent = `Total ${++totalClicks}`;

    if (Math.random() < 0.125) {
        return restart();
    }

    button.textContent = ++actualClicks;

    if (actualClicks > maxScore) {
        maxScore = actualClicks;
        maxScoreData.textContent = `Maximo ${maxScore}`;
    }

    if (totalClicks === 1 && localStorage.getItem('achv1') === null) {
        completeAchievement(1);
    }
    if (actualClicks === 10 && localStorage.getItem('achv2') === null) {
        completeAchievement(2);
    }
    if (actualClicks === 25 && localStorage.getItem('achv3') === null) {
        completeAchievement(3);
    }
    if (actualClicks === 50 && localStorage.getItem('achv4') === null) {
        completeAchievement(4);
    }
    if (totalClicks === 100 && localStorage.getItem('achv5') === null) {
        completeAchievement(5);
    }

    saveStats();
}

function achievementPanelSystem() {
    if (state === 'closed') {
        state = 'open';
        
        achievements.style.transform = 'translateX(-455px)';
    } else {
        state = 'closed';

        achievements.style.transform = 'translateX(0px)';
    }
}

function completeAchievement(achievement) {
    const achievementsMap = [
    {
        achievementData: document.querySelector('.achv-1'),
        h3: document.querySelector('.achv-1 h3'),
        bgColor: '#7cb859ff'
    },
    {
        achievementData: document.querySelector('.achv-2'),
        h3: document.querySelector('.achv-2 h3'),
        bgColor: '#5972b8ff'
    },
    {
        achievementData: document.querySelector('.achv-3'),
        h3: document.querySelector('.achv-3 h3'),
        bgColor: '#7e59b8ff'
    },
    {
        achievementData: document.querySelector('.achv-4'),
        h3: document.querySelector('.achv-4 h3'),
        bgColor: '#e9cc4aff'
    },
    {
        achievementData: document.querySelector('.achv-5'),
        h3: document.querySelector('.achv-5 h3'),
        bgColor: '#fd5d5dff'
    },
    {
        achievementData: document.querySelector('.achv-6'),
        h3: document.querySelector('.achv-6 h3'),
        bgColor: '#d16bc4ff'
    },
    {
        achievementData: document.querySelector('.achv-7'),
        h3: document.querySelector('.achv-7 h3'),
        bgColor: '#5e3c25ff'
    }
];

    const achievementChosen = achievementsMap[achievement - 1];

    achievementChosen.achievementData.style.backgroundColor = achievementChosen.bgColor;

    achievementNotification.style.opacity = 1;
    achievementNotification.style.backgroundColor = achievementChosen.bgColor;
    document.querySelector('.achievement-unlocked').textContent = achievementChosen.h3.textContent;
    setTimeout(() => {
        achievementNotification.style.opacity = 0;
    }, 4000);

    saveAchievement(achievement);
}

button.addEventListener('click', buttonOperation);

achievementsPanelDisplayButton.addEventListener('click', achievementPanelSystem);