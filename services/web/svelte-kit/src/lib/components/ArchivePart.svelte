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

<div class="part hover:bg-blue-950 transition-all duration-100 border">
    <div style="display: block">
        <div class="part-status">You {part.winner_id === user.user_id ? "won" : "lost"} against <b>{getOpponentUsername()}</b></div>
        <div style="text-align: right; display: inline">
            <button class="rematch-button rounded-lg bg-green-600 text-sm font-bold">
                Ask a rematch
            </button>
        </div>
    </div>
    <div class="text-sm">
        Match date : {part.date}
        <br>
        Match time : {durationToString(part.duration)}
    </div>
</div>

<style>
    .part {
        padding: 0.5em 7em 0.5em 7em;
        margin: 0.5em 0 0.5em 0;
        display: inline-block;
        border-color: rgba(0, 0, 0, 0);
    }
    .part:hover {
        border-color: white;
    }
    .part-status {
        display: inline;
        margin-right: 5em;
    }
    .rematch-button {
        font-size: 0.8em;
        padding: 0.5em;
        margin-left: 5em;
    }
</style>