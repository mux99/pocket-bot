<script>
    export let notification;
    export let removeFromNotifications;

    async function markAs(seen) {
        notification.seen = seen;
        await fetch(`/notifications/${notification.id}/${seen ? 'seen' : 'unseen'}`, {method: 'POST'});
    }

    async function deleteNotification() {
        removeFromNotifications(notification);
        await fetch(`/notifications/${notification.id}/delete`, {method: 'POST'})
    }
</script>

<div class="notification">
    <div class="notification-info">
        {#if notification.type === 'friends'}
            <b>{notification.sender}</b> sent you a friends request
            <a href="/friend" target="_blank" class="notification-goto">
                <img
                  class="notification-goto-img"
                  src="/img/notifications/link.svg"
                  alt="a go to icon"
                />
            </a>
        {:else if notification.type === 'parts'}
            <b>{notification.sender}</b> sent you a part request
            <a href="/parts/requests" target="_blank" class="notification-goto">
                <img
                  class="notification-goto-img"
                  src="/img/notifications/link.svg"
                  alt="a go to icon"
                />
            </a>
        {:else}
            {notification.type}
        {/if}
    </div>
    <div class="notification-controller">
        <button
                class="notification-button"
                style="background-color: {notification.seen ? 'gray' : 'blue'}"
                on:click={async () => await markAs(!notification.seen)}
        >
            <img
                    src="/img/notifications/{notification.seen ? 'unseen' : 'seen'}.png"
                    alt="a mark as {notification.seen ? 'unseen' : 'seen'} button"
                    class="notification-button-img"
            />
        </button>
        <button class="notification-button" style="background-color: red" on:click={deleteNotification}>
            <img
                    src="/img/notifications/delete.png"
                    alt="a delete notification button"
                    class="notification-button-img"
            />
        </button>
    </div>
</div>

<style>
    .notification {
        display: inline-block;
        background-color: #000B1D;
        text-align: center;
        color: white;
        font-size: 1.1em;
        padding: 2em;
        border: solid 0.05em rgba(255, 255, 255, 0);
        border-radius: 0.5em;
        transition: all 250ms;
        margin: 1em;
        width: 22em;
    }

    .notification:hover {
        border-color: rgba(255, 255, 255, 1);
    }

    .notification-goto {
        margin-bottom: -0.5em;
        display: inline-block;
    }

    .notification-goto-img {
        max-width: 2em;
        max-height: 2em;
    }

    .notification-info {
        display: inline-block;
    }

    .notification-controller {
        display: block;
    }

    .notification-button {
        margin: 0.25em;
        border: 0.1em solid rgba(255, 255, 255, 0);
        border-radius: 0.2em;
        padding: 0.15em;
        transition: all 250ms;
    }

    .notification-button:hover {
        border-color: rgba(255, 255, 255, 1);
    }

    .notification-button-img {
        width: 2em;
        height: 2em;
    }
</style>
