<script>
  export let notifications;
</script>

{#if notifications.length}
  <span class="notifications-bubble">{notifications.length}</span>
{/if}

<style>
    .notifications-bubble {
        z-index: 4;
        position: absolute;
        background-color: red;
        margin-top: -1em;
        color: white;
        padding: 0.5em;
        clip-path: circle();
        font-size: 0.8em;
    }
</style>
