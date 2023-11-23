<script>
  import { onMount, afterUpdate } from 'svelte';

  let joystick, outerCircle, actionButton, batteryPercentage, lifeContainer, batteryIcon;
  let batteryPercent = 25;
  let lives = 3;
  let isDragging = false;
  let distanceJoystick = 0;
  let angleJoystick = 0;
  let keysPressed = { z: false, q: false, d: false, s: false };
  let joystickPosition = { x: 0, y: 0 };
  const smoothingFactor = 0.1;

  onMount(() => {
    joystick = document.getElementById('joystick');
    outerCircle = document.getElementById('outerCircle');
    actionButton = document.getElementById('actionButton');
    batteryPercentage = document.getElementById('batteryPercentage');
    lifeContainer = document.getElementById('lifeContainer');
    batteryIcon = document.getElementById('batteryIcon');

    init();
  });

  afterUpdate(() => {
    // Update logic after each Svelte update
    updateBattery();
    updateLives();
  });

  function init() {
    joystick.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('mousemove', moveJoystick);

    // Attach other event listeners as needed
    // actionButton.addEventListener('click', activateArms);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  }

  function startDrag(e) {
    isDragging = true;
    moveJoystick(e);
  }

  function endDrag() {
    if (isDragging) {
      isDragging = false;
      resetJoystickPosition();
    }
  }

  function moveJoystick(e) {
    if (isDragging) {
      const rect = outerCircle.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      const maxDistance = rect.width / 2;
      let distance = (Math.hypot(offsetX, offsetY) / maxDistance) * 100;
      distance = Math.min(distance, 100);
      let logicAngle = (Math.atan2(offsetY, offsetX) * 180) / Math.PI;
      let displayAngle = (logicAngle + 360 + 90) % 360;
      displayAngle = 360 - displayAngle;
      updatePosition(displayAngle, distance);
      const limitedX = Math.cos((logicAngle * Math.PI) / 180) * (distance / 100) * maxDistance;
      const limitedY = Math.sin((logicAngle * Math.PI) / 180) * (distance / 100) * maxDistance;
      joystick.style.transform = `translate(-50%, -50%) translate(${limitedX}px, ${limitedY}px)`;
      console.log(displayAngle);
      console.log(distance);
    }
  }

  function resetJoystickPosition() {
    joystick.style.transform = 'translate(-50%, -50%) translate(0, 0)';
    updatePosition(0, 0);
  }

  function calculateMotorSpeeds(angle, distance) {
    const eq1 = Math.cos((angle * Math.PI) / 90) * distance;
    const eq2 = Math.cos(((90 + angle) * Math.PI) / 90) * distance;
    let left, right;
    if (angle < 90) {
      left = eq1;
      right = distance;
    } else if (angle < 180) {
      left = -distance;
      right = eq2;
    } else if (angle < 270) {
      left = eq2;
      right = -distance;
    } else {
      left = distance;
      right = eq1;
    }
    return { left, right };
  }

  function updatePosition(angle, distance) {
    angleJoystick = angle;
    distanceJoystick = distance;
    console.log(calculateMotorSpeeds(angleJoystick, distanceJoystick));
  }

  function updateLives() {
    lifeContainer.innerHTML = '';

    for (let i = 0; i < lives; i++) {
      const lifeIcon = document.createElement('img');
      lifeIcon.classList.add('life-icon');
      lifeIcon.src = '/heart.svg';
      lifeContainer.appendChild(lifeIcon);
    }
  }

  function updateBattery() {
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

  function handleKeyDown(event) {
    const key = event.key.toLowerCase();

    if (keysPressed.hasOwnProperty(key)) {
      keysPressed[key] = true;
      handleKeyChanges();
    }
  }

  function handleKeyUp(event) {
    const key = event.key.toLowerCase();

    if (keysPressed.hasOwnProperty(key)) {
      keysPressed[key] = false;
      handleKeyChanges();
    }
  }

  function handleKeyChanges() {
    const targetX = (keysPressed.d ? 1 : 0) - (keysPressed.q ? 1 : 0);
    const targetY = (keysPressed.s ? 1 : 0) - (keysPressed.z ? 1 : 0);

    joystickPosition.x += smoothingFactor * (targetX - joystickPosition.x);
    joystickPosition.y += smoothingFactor * (targetY - joystickPosition.y);

    const angle = Math.atan2(joystickPosition.y, joystickPosition.x);
    const distance = Math.min(outerCircle.clientWidth / 2, outerCircle.clientHeight / 2);

    updatePosition(angle, distance);

    const limitedX = Math.cos(angle) * distance;
    const limitedY = Math.sin(angle) * distance;
    joystick.style.transform = `translate(-50%, -50%) translate(${limitedX}px, ${limitedY}px)`;

    if (!(keysPressed.z || keysPressed.q || keysPressed.d || keysPressed.s)) {
      resetJoystickPosition();
    }
  }
</script>
<style>
    :root{
        --bt-image: url("https://cdn-icons-png.flaticon.com/512/9173/9173887.png");
    }

    body {
        font-family: 'Avenir', sans-serif;
        overflow: hidden;
        height: 100vh;
        background-color: #13151f;
        -moz-user-select: none;
    }

    :global(.life-icon) {
      width: 5vh;
      height: 5vh;
      margin-right: 2vh;
      margin-left: 2vh;
    }

    #lifeContainer {
        justify-content: center;
        align-items: center;
        display: flex;
        margin-top: 5vh;
    } 

    .battery {
        position: absolute;
        top: 3vh;
        right: 3vh;
    }

    .battery-icon {
        border-radius: 1vh;
        width: 10vh;
        height: 4vh;
        border: 1px solid white;
        position: absolute;
        top: 2vh;
        right: 5vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #batteryPercentage {
        color: #fff;
    }

    .action-button {
        position: absolute;
        bottom: 20%;
        right: 15%;
        text-align: center;
        justify-content: center;
        border: 3px solid transparent;
        border: 1px solid #ffffff;
        border-radius: 50%;
        cursor: pointer;
    }

    .button-text {
        width: 15vh ;
        height: 15vh;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.2);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2vh;
    }

    .action-button:hover {
        background-color: rgba(255, 255, 255, 0.07);
    }

    .joystick-container {
        position: absolute;
        top: 33%;
        left: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .outer-circle {
        position: relative;
        width: 35vh;
        height: 35vh;
        border: 1px solid #ffffff;
        border-radius: 50%;
    }

    .circle-around {
        position: absolute;
        width: 103%;
        height: 103%;
        border: 2px solid #ffffff;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .joystick {
        width: 16vh;
        height: 16vh;
        cursor: pointer;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%; 
        background-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
        border: 4px solid #ffffff;
    }

    #btcontainer {
        position: absolute;
        top: 5vh;
        left: 7vh;
    }

    #bluetooth_button {
        margin: auto auto;
        border-radius: 50%;
        height: 8vh;
        width: 8vh;
        border-color: #A8A9AD;
        border-width: 3px;
        background-image: var(--bt-image);
        background-size: contain;
        background-repeat: no-repeat;
    }
    #bluetooth_button.connected { border-color: #00ff00;}
    #bluetooth_button.disconnected {border-color: #f00102;}
    #bluetooth_button.connecting {border-color: #fd9621;}

    @media screen and (max-width: 767px) and (orientation: portrait) {
        #bluetooth_button { height: 6vh; width: 6vh; }
        .lives { margin-top: 15vh; }
        #btcontainer { position: absolute; top: 4vh; }
        :global(.life-icon) { width: 4vh; height: 4vh; }
        .battery-icon { width: 8vh; height: 3vh; }
        .outer-circle { width: 25vh; height: 25vh; }
        .joystick { width: 10vh; height: 10vh; }
        .button-text { width: 10vh ; height: 10vh; }
        .joystick-container { top: 60%; left: 15%; }
        .action-button { bottom: 50vh; }
    }

    @media screen and (max-width: 950px) and (orientation: landscape) {
        #bluetooth_button { height: 18vh; width: 18vh; }
        :global(.life-icon) { width: 10vh; height: 10vh; }
        .battery-icon { width: 25vh; height: 10vh; }
        .outer-circle { width: 55vh; height: 55vh; }
        .joystick { width: 25vh; height: 25vh; }
        .button-text { width: 35vh ; height: 35vh; }
        .joystick-container { top: 25%; }
    }
</style>

<body onload="init();">
    <div class="battery">
        <div class="battery-icon" id="batteryIcon">
            <span id="batteryPercentage"></span>
        </div>
    </div>    
    <div class="lives">
        <div id="lifeContainer" class="life-container"></div>
    </div>
    <div class="action-button" id="actionButton">
        <div class="button-text">
            <p>Press to move arms</p>
        </div>
    </div>
    <div class="joystick-container">
        <div id="outerCircle" class="outer-circle">
            <div class="circle-around"></div>
        </div>
        <div id="joystick" class="joystick">
            <div class="inner-circle"></div>
        </div>
    </div>
    <div id="btcontainer"><button id="bluetooth_button" type="button" class="disconnected"
        onclick="bluetooth_click()"></button>
    </div>
</body>
