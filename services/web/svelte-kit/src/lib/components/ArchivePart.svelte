<script>
    import {browser} from "$app/environment";

    export let part;
    export let user;

    function durationToString(duration) {
        duration /=1000;
        let minute = Math.floor(duration / 60);
        if (duration % 60 === 0)
            return `${minute} m`;
        return `${minute} m ${(duration % 60).toFixed(0)} s`;
    }

    function getOpponentUsername() {
        if(part.winner_deleted || part.loser_deleted) return "Deleted User"
        else return part.winner_id === user.user_id ? part.loser_username : part.winner_username
    }

</script>

<style>
    .part {
        background-color: var(--background-3);
        padding: 2em;
        margin: 1em 0 1em 1em;
        text-align: center;
        border-radius: 1em;
    }
</style>

<div class="part">
    <span>You {part.winner_id === user.user_id ? "won" : "lost"} against <b>{getOpponentUsername()}</b> <a href="/part/new">Ask a rematch</a></span>
    <div>
        Match date : {part.date}
        <br>
        Match time : {durationToString(part.duration)}
    </div>
</div>