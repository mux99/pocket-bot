<script>
    import Notification from "$lib/components/Notification.svelte";

    export let data;
    let {notifications} = data;

    function remove(notificationToRemove) {
        notifications = notifications.filter(notification => notification.id !== notificationToRemove.id);
    }
</script>

<div id="all-notifications">
    {#if notifications.length}
        {#each notifications as notification}
            <Notification notification={notification} removeFromNotifications={remove}/><br>
        {/each}
    {:else}
        <p id="no-notification">You have no notifications</p>
    {/if}
</div>

<style>
    #all-notifications {
        text-align: center;
    }

    #no-notification {
        color: white;
        font-size: 1.5em;
        font-weight: bold;
    }
</style>
