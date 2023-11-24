import { lives_conf, batteryPercent_conf } from './config.js'
let lives = lives_conf;
let batteryPercent = batteryPercent_conf;

export function updateLives() {
    lifeContainer.innerHTML = '';

    for (let i = 0; i < lives; i++) {
      const lifeIcon = document.createElement('img');
      lifeIcon.classList.add('life-icon');
      lifeIcon.src = '/heart.svg';
      lifeContainer.appendChild(lifeIcon);
    }
}

export function updateBattery() {
    const percentage = batteryPercent || 100;
    batteryPercentage.textContent = `${percentage}%`;

    const gradientColor = getGradientColor(percentage);
    batteryIcon.style.background = `linear-gradient(to right, ${gradientColor} ${percentage}%, rgba(255, 255, 255, 0.3) 0%)`;
}

function getGradientColor(percentage) {
    if (percentage > 80) {
        return '#078a00';
    } else if (percentage > 60) {
        return '#748a01';
    } else if (percentage > 40) {
        return '#e08a03';
    } else if (percentage > 20) {
        return '#ce4501';
    } else if (percentage >= 0) {
        return '#bb0002';
    }
}