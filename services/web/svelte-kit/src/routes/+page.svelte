<svelte:head>
    <title>Welcome to Pocket Bot™ *</title>
</svelte:head>

<script>
    import "../app.css";

    let show_rules = false
  
    let rules = [
      "Each person control one robot",
      "The first robot to have its 3 lives knocked off of him loses",
      "If your robot get's flipped, you Lose !"
    ];

  </script>
  
  <main id="form">
    <h1 id="title">Welcome to Pocket Bot™ *</h1>
    <p>Pocket Bot™ * is a real life robot combat game ! Fight against your friends or make new ones by going at it together !
        Alone ? You can also just take control of the Pocket Bot™ * and have fun controling this powerfull machine !
    </p>
    <div id="pictures">
        <img src="/img/bot1-transformed.png" alt="Pocket bot picture">
        <img src="/img/bot2-transformed.png" alt="Pocket bot picture">
    </div>
  <br>
    <button data-testid="show_rule_button" on:click={() => show_rules = !show_rules}>{show_rules ? 'Hide Rules' : 'Show Rules'}</button>
    <br>
    <div id="rules" >
      {#if show_rules}
        <h2>Rules</h2>
        <ol>
          {#each rules as rule}
            <li>{rule}</li>
          {/each}
        </ol>
      {/if}
    </div>
    

    <p id="notes">* Pocket Bot™ is not trademarked, the only purpose of the ™ is to look fancy</p>
  </main>
  
<style>
    #form {
        padding: 1em;
        display: inline-block;
        background-color: rgb(31 41 55);
        color: white;
        font-size: 1.3em;
        box-shadow: 4px 4px 4px black;
        border-radius: 0.5em;
        margin: 5em 1em 1em 1em;
        text-align: center;
    }
    #pictures {
        padding: 1em;
        display: inline-block;
        background-color: rgba(255, 255, 255, 0.2);
        font-size: 1.3em;
        border-radius: 0.5em;
        margin: 1em 1em 1em 1em;
    }

    #rules {
      text-align: center;
      display: inline-block
    }

    #rules > ol {
      text-align: center;
      list-style-position: inside;
    }

    #title {
        font-weight: bold;
        font-size: 1.8em;
    }
    #notes {
        font-size: 0.4em;
    }
</style>