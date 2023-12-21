<script>
    import ArchivePart from "$lib/components/ArchivePart.svelte";

    export let data;
    const user = data.user;
    let parts = user.parts;
    const totalWin = parts.filter(part => part.winner_id === user.user_id).length;
    let selectSortType = "date";
    const sortTypes = {
        date: (a, b) => a.date > b.date ? 1 : -1,
        duration: (a, b) => parseInt(a.duration) > parseInt(b.duration) ? -1 : 1,
        won: (a, b) => a.winner_id === user.id ? 1 : -1,
        lost: (a, b) => a.loser_id === user.id ? 1 : -1
    };

    function changeSortType() {
        let copy_parts = parts.sort(sortTypes[selectSortType]);
        parts = [];
        parts.push(...copy_parts);
    }
</script>

<style>

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

<div>
    <a class="am_a_button" href="/profile">⤶ Back to profile</a>
    <div id="page">
        {#if parts.length}
            <h2>
                You won
                <span style="color: var(--green);">{totalWin}</span>
                parts and lost
                <span style="color: var(--red);">{parts.length - totalWin}</span>
                parts :
            </h2>
            <div>
                <label for="sort-parts">Sort by</label>
                <select name="sort-parts" bind:value={selectSortType} on:change={changeSortType}>
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
            <div id="all-parts">
                {#each parts as part}
                    <ArchivePart part={part} user={user} />
                    <br>
                {/each}
            </div>
        {:else}
            <h2>It's time to make some parts !</h2>
            <br>
        {/if}
    </div>
</div>