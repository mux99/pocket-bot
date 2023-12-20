let isFall = "0";


export function updateLives(lives_left) {
    lifeContainer.innerHTML = '';

    for (let i = 0; i < lives_left; i++) {
      const lifeIcon = document.createElement('img');
      lifeIcon.classList.add('life-icon');
      lifeIcon.src = '/heart.svg';
      lifeContainer.appendChild(lifeIcon);
    }
    if (lives_left == "3"){
        endGame();
    }
}

export function updateBattery(battery_left) {
    const percentage = battery_left || 100;
    batteryPercentage.textContent = `${percentage}%`;

    const gradientColor = getGradientColor(percentage);
    batteryIcon.style.background = `linear-gradient(to right, ${gradientColor} ${percentage}%, rgba(255, 255, 255, 0.3) 0%)`;
}

export function updateFall(fall_bool) {
    isFall = fall_bool;
    if (isFall == "1"){
        endGame();
    }
}

export function endGame(){
    //tmp
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