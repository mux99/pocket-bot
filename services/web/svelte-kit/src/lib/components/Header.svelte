<script>
	import NotificationsBubble from '$lib/components/NotificationsBubble.svelte';

	export let user;
	const notifications = user.notifications ? user.notifications : [];
	let showNotifications = false;
	const notificationsToSee = notifications.filter(notification => !notification.seen).length;
	const friendsNotificationsToSee = notifications.filter(notifications => !notifications.seen && notifications.type.toLowerCase() === 'friends');
	const partsNotificationsToSee = notifications.filter(notifications => !notifications.seen && notifications.type.toLowerCase() === 'parts');

	function notificationsToString() {
		return notificationsToSee > 9 ? "9+" : notificationsToSee;
	}

	async function disconnect() {
		await fetch('/logout', {method: 'POST'});
		location.reload();
	}

	function hideNotification() {
		showNotifications = false;
	}
</script>

<header>
	<div id='notifications-counter' style='opacity: {!showNotifications && notificationsToSee ? "1": "0"}'>{notificationsToString()}</div>
	<div
		on:click={() => showNotifications = !showNotifications}
		on:keypress={() => showNotifications}
		on:keydown={() => showNotifications}
		aria-hidden="false"
		role="button"
		aria-pressed="false"
		tabindex="0"
	>
		<img src={user.avatar} alt="{user.username}'s avatar" id="avatar-header" class={showNotifications ? 'avatar-header-big' : 'avatar-header-small'} />
	</div>
	<br>

	<nav id="navbar-header" class={showNotifications ? "navbar-header-showed" : "navbar-header-hidden"}>
		<a href='/' class="links-header" on:click={hideNotification}>Home page</a><br>
		<a href='/profile' class="links-header" on:click={hideNotification}>Profile</a><br>
		<a href='/friend' class="links-header" on:click={hideNotification}>
			Friends request
			<NotificationsBubble notifications={friendsNotificationsToSee} />
		</a><br>
		<a href='/parts/requests' class="links-header" on:click={hideNotification}>
			Parts request
			<NotificationsBubble notifications={partsNotificationsToSee} />
		</a>
		<br>
		<a href='/notifications' class="links-header" on:click={hideNotification}>
			Notifications
			<NotificationsBubble notifications={notifications}/>
		</a><br>
		<a href='/login' class="links-header" on:click={disconnect} data-sveltekit-reload>Disconnect</a>
	</nav>
	<div
		id='filled-header'
		on:click={() => showNotifications = !showNotifications}
		class={!showNotifications ? "filled-header-hidden" : "filled-header-showed"}
		aria-hidden='true'
	></div>
</header>

<style>
	header {
		text-align: center;
		background-color: #000B1D;
		color: white;
		box-shadow: black 0.3em 0.3em 0.3em 0.3em;
		margin-bottom: 1em;
	}

	#notifications-counter {
		z-index: 2;
		background-color: red;
		color: white;
		clip-path: circle();
		padding: 0.2em;
		top: 2em;
		margin-left: 3em;
		position: relative;
		font-size: 1em;
		margin-top: -2.0em;
	}

	#avatar-header {
		cursor: pointer;
		clip-path: circle();
		display: inline-block;
		transition: all 500ms;
	}

	.avatar-header-small {
		max-width: 4em;
		max-height: 4em;
	}

	.avatar-header-big {
		max-width: 8em;
		max-height: 8em;
	}

	.links-header {
		display: inline-block;
		font-size: 1.1em;
		font-weight: bold;
		padding: 0.3em 1.5em 0.3em 1.5em;
		margin: 0.5em;
		border: rgba(255, 255, 255, 0) 0.02em solid;
		border-radius: 0.5em;
	}

	.links-header:hover {
		border-color: rgba(255, 255, 255, 0.5);
	}

	#navbar-header {
		z-index: 3;
		background-color: #000B1D;
		display: block;
		width: 100vw;
		transition: all 500ms;
		position: absolute;
		box-shadow: black 0.5em 0.5em 0.3em 0.35em;
	}

	.navbar-header-showed, .navbar-header-showed > * {
		height: auto;
		font-size: 1em;
	}

	.navbar-header-hidden, .navbar-header-hidden > * {
		opacity: 0;
		height: 0;
		font-size: 0;
	}

	.filled-header-hidden {
		height: 0;
		opacity: 0.5;
	}
	.filled-header-showed {
		height: 100vh;
		opacity: 0.7;
	}

	#filled-header {
		background-color: black;
		z-index: 2;
		position: fixed;
		transition: all 500ms;
		width: 100vw;
	}
</style>
