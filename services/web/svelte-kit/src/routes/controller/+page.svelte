<script>
    import { onMount, afterUpdate, onDestroy } from 'svelte';
  import { startDrag, endDrag, moveJoystick, activateArms } from './scripts/joystick.js';
    import { endGame, stopServerSentEventSession, updateBattery, updateLives } from './scripts/update.js';
  import { handleKeyDown, handleKeyUp } from './scripts/key.js';
  import { connect, disconnect, get_os } from './scripts/blt.js';
  import { startServerSentEvenSession } from './scripts/update.js';

  export let data;
  let joystick, outerCircle, actionButton, batteryPercentage, lifeContainer, batteryIcon;

  onMount(() => {
    joystick = document.getElementById('joystick');
    outerCircle = document.getElementById('outerCircle');
    actionButton = document.getElementById('actionButton');
    batteryPercentage = document.getElementById('batteryPercentage');
    lifeContainer = document.getElementById('lifeContainer');
    batteryIcon = document.getElementById('batteryIcon');
    init();
    if (data.part)
        startServerSentEvenSession();
  });

  onDestroy(() => stopServerSentEventSession());

  afterUpdate(() => {
    updateLives("3");
  });

  function init() {
    joystick.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('mousemove', moveJoystick);

    actionButton.addEventListener('mousedown', function() {activateArms(1);});
    actionButton.addEventListener('mouseup', function() {activateArms(0);});

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    get_os();
  }

  //called on bluetooth button click
  function bluetooth_click() {
    let bluetooth_button = document.getElementById("bluetooth_button");
    if (bluetooth_button.classList.contains("connected")) {
        bluetooth_button.classList.remove("connected");
        bluetooth_button.classList.add("disconnected");
        disconnect();
    }
    else if (bluetooth_button.classList.contains("disconnected")) {
        bluetooth_button.classList.remove("disconnected");
        bluetooth_button.classList.add("connecting");
        connect();
    }


}
  function getTitle() {
      if (!data.part)
          return "You're playing in a free roaming";
      return `You're playing against ${data.user_info.user_id === data.part.player1_id ? data.part.player1_username : data.part.player2_username}`;
  }
</script>
<style>
    :root{
        --bt-image: url("https://cdn-icons-png.flaticon.com/512/9173/9173887.png");
        overflow: hidden;
    }

    body {
        height: 100vh;
        -moz-user-select: none;
    }

    :global(.life-icon) {
      width: 5vh;
      height: 5vh;
      margin-right: 2vh;
      margin-left: 2vh;
    }

    #endgame {
        position: absolute;
        bottom: 3%;
        left: 3%;
        background-color: var(--red);
        height: 3em;
        width: 10em;
    }

    #lifeContainer {
        justify-content: center;
        align-items: center;
        display: flex;
        margin-top: 5vh;
        user-select: none;
        pointer-events: none;
    } 

    .battery {
        position: absolute;
        top: 3vh;
        right: 3vh;
        user-select: none;
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
        user-select: none;
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

        border: 3px solid #A8A9AD;
        background-image: var(--bt-image);
        background-size: contain;
    }
    :global(#bluetooth_button.connected) { border-color: var(--green); }
    :global(#bluetooth_button.disconnected) { border-color: var(--red); } 
    :global(#bluetooth_button.connecting) { border-color: #fd9621; }

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

    #title {
        display: block;
        text-align: center;
    }
</style>

<body>
    <div id="title">
        <h2>{getTitle()}</h2>
    </div>

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
        on:click={bluetooth_click}></button>
    </div>
    <button id="endgame" on:click={endGame}>End game</button>
</body>

