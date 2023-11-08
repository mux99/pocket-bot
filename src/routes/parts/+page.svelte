<script>
    import ArchivePart from "$lib/components/ArchivePart.svelte";

    export let data;
    const user = data.user;
    let parts = user.parts;
    const totalWin = parts.filter(part => part.winner_id === user.user_id).length;
    let selectSortType = "date";
    const sortTypes = {
        date: (a, b) => a.date > b.date ? 1 : -1,
        duration: (a, b) => a.duration > b.duration ? 1 : -1,
        won: (a, b) => a.winner_id === user.id ? 1 : -1,
        lost: (a, b) => a.loser_id === user.id ? 1 : -1
    };

    function changeSortType() {
        let copy_parts = parts.sort(sortTypes[selectSortType]);
        parts = [];
        parts.push(...copy_parts);
    }
</script>

<div class="bg-gray-900 text-white text-xl">
    <a id="back-profile" href="/profile">⤶ Back to profile</a>
    <div id="page">
        {#if parts.length}
            <h2 style="padding-bottom: 0.7em">
                You won
                <span class="text-green-600 font-bold">{totalWin}</span>
                parts and lost
                <span class="text-red-600 font-bold">{parts.length - totalWin}</span>
                parts :
            </h2>
            <div>
                <label for="sort-parts">Sort by</label>
                <select name="sort-parts" bind:value={selectSortType} on:change={changeSortType} class="bg-gray-900">
                    <option value="date">date</option>
                    <option value="duration">duration</option>
                    {#if totalWin}
                        <option value="won">victories</option>
                    {/if}
                    {#if totalWin < parts.length}
                        <option value="lost">lost</option>
                    {/if}
                </select>
            </div>
            <div id="all-parts" class="text-white border rounded bg-gray-800 border-gray-700">
                {#each parts as part}
                    <ArchivePart part={part} user={user} />
                    <br>
                {/each}
            </div>
        {:else}
            <h2>Il est temps de faire une partie</h2>
        {/if}
    </div>
</div>


<style>
    select {
        border: solid 0.05em rgba(0, 0, 0, 0);
        transition-duration: 100ms;
    }
    select:hover {
        border-color: white;
    }
    #back-profile {
        display: inline-block;
        padding: 0.5em;
        margin: 0.2em;
        border: solid 1px rgba(0, 0, 0, 0);
        border-radius: 0.2em;
        transition-duration: 350ms;
    }
    #back-profile:hover {
        border-color: white;
    }
    #page {
        font-size: 1.5em;
        text-align: center;
    }
    #all-parts {
        padding: 1em 2em 1em 2em;
        display: inline-block;
        margin: 1em;
    }

</style>

