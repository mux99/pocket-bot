import { goto } from '$app/navigation';
import { redirect } from '@sveltejs/kit';

let isFall = "0";
let eventSource;


export function updateLives(lives_left) {
    lifeContainer.innerHTML = '';

    for (let i = 0; i < lives_left; i++) {
      const lifeIcon = document.createElement('img');
      lifeIcon.classList.add('life-icon');
      lifeIcon.src = '/heart.svg';
      lifeContainer.appendChild(lifeIcon);
    }
    if (lives_left == "0"){
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
    if (eventSource)
        eventSource.close();
    alert("You've lost the part");
    fetch('/parts/lose', {method: 'POST'}).then(() => goto('/parts'));
}

export function startServerSentEvenSession() {
    eventSource = new EventSource('/controller/sse');
    if (!eventSource)
        throw redirect(307, '/login');
    eventSource.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        if (eventData.loser) {
            stopServerSentEventSession();
            alert(`You've won the part !`);
            goto('/parts');
        }
    }
}

export function stopServerSentEventSession() {
    if (eventSource)
        eventSource.close();
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