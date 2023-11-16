<script>
    export let opponent;
    export let cancelPartFunction;
    let startWaited;
    let timeWaitedToString
    const dots = [".", "..", "..."];
    let currentDot = dots[0];
    animateDots();
    setTimeWaitedToString();
    function animateDots() {
        const index = dots.indexOf(currentDot);
        if (index === dots.length - 1) {
            currentDot = dots[0];
        } else {
            currentDot = dots[index + 1];
        }
        setTimeout(animateDots, 450);
    }

    function setTimeWaitedToString() {
        if (!startWaited)
            startWaited = Date.now();
        const second = Math.floor((Date.now() - startWaited) / 1000);
        if (second === 0) {
            timeWaitedToString = '';
        } else if (second >= 60) {
            const minutes = Math.floor(second / 60);
            timeWaitedToString = `${minutes.toFixed(0)} minute${minutes > 1 ? 's' : ''} and ${second % 60} seconde${second % 60 > 1 ? 's' : ''}.`;
        } else {
            timeWaitedToString = `${second} seconde${second > 1 ? 's' : ''}.`;
        }
        setTimeout(setTimeWaitedToString, 1000);
    }

</script>

<div id="popup-loading-part" class="bg-gray-900">
    <p id="info-success">Your part request has been successfully sent !</p>
    <img src="/img/loading.gif" alt="a wheels that spin" id="loading-gif">
    <p id="info-waiting">Now waiting for <i>{opponent}</i>'s response {currentDot}</p>
    {#if timeWaitedToString !== ''}
        <p id="time-waited">for {timeWaitedToString}</p>
    {/if}
    <button id="cancel-part" on:click={cancelPartFunction}>Cancel part</button>
</div>

<style>
    #popup-loading-part {
        z-index: 1;
        display: inline-block;
        padding: 5em 1.2em 5em 1.2em;
        border-radius: 0.5em;
        text-align: center;
        box-shadow: 4px 4px 4px black;
        background-color: rgb(31 41 55);
        color: white;
        font-weight: bold;
        border: 0.5em #e5e7eb;
        transition-duration: 100ms;
        transform-style: flat;
        margin: 7em 0 2em 0;
    }

    #info-success {
        color: green;
        font-size: 1.7em;
        margin-bottom: 1em;
    }

    #info-waiting {
        margin: 0.35em 0 0.35em 0;
        font-size: 1.5em;
    }

    #time-waited {
        font-size: 1.2em;
        margin-bottom: 1.1em;
    }

    #loading-gif {
        max-width: 20%;
        min-height: 20%;
        display: inline-block;
    }

    #cancel-part {
        background-color: red;
        border-radius: 0.5em;
        padding: 0.15em 0.5em 0.25em 0.5em;
        font-size: 1.7em;
    }

</style>
