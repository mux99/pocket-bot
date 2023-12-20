<script>
    import PartRequest from "$lib/components/PartRequest.svelte";

    export let data;
</script>

<div style="text-align: center">
    <div id="all-request">
        {#if data.asked_part.length}
            <h2 id="request-info">
                You've {data.asked_part.length} parts requests !
                <br>
                You can accept only one at time
            </h2>
            <br>
            {#each data.asked_part as part}
                <PartRequest part={part} />
            {/each}
        {:else}
            <p id="no-request">
                No one asked you a part ☹️
                <br>
                <a href="/parts/new">Why not offer one ?</a>
            </p>
        {/if}
    </div>

</div>

<style>
    #request-info {
        display: inline-block;
        margin-bottom: 0.75em;
    }

    #all-request {
        margin: 1em;
        padding: 1em;
        display: inline-block;
        background-color: var(--background-3);
        border-radius:0.25em;
        box-shadow: 2px 2px 2px black;
    }

    #no-request {
        transition: color ease-in 500ms;
    }
    #no-request > a:hover {color: aqua;}
</style>
