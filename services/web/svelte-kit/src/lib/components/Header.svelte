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

<style>
	header {
		text-align: center;
		background-color: var(--background-3);
		box-shadow: black 0 0 2px 0;
	}

	a {
		width: 90%;
		margin: 0 auto;
	}

	#notifications-counter {
		z-index: 2;
		background-color: var(--red);
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
		margin-top: 1em;
		margin-bottom: 1em;
		max-width: 4em;
		max-height: 4em;
	}

	.avatar-header-big {
		margin-top: 1em;
		margin-bottom: 1em;
		max-width: 8em;
		max-height: 8em;
	}

	#navbar-header {
		z-index: 3;
		background-color: var(--background-3);
		display: block;
		width: 100vw;
		transition: all 500ms;
		position: absolute;
		padding-bottom: 1em;
	}

	.navbar-header-showed, .navbar-header-showed > * {
		height: auto;
		font-size: 1em;
	}

	.navbar-header-hidden, .navbar-header-hidden > * {
		height: 0;
		font-size: 0;
	}

	.filled-header-hidden {
		height: 0;
		opacity: 0.5;
		background-color: rgba(0, 0, 0, 0);
	}
	.filled-header-showed {
		height: 100vh;
		opacity: 0.7;
		background-color: rgba(39, 35, 35, 0.699);
	}

	#filled-header {
		z-index: 2;
		position: fixed;
		transition: all 500ms;
		width: 100vw;
	}
</style>

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

	<nav id="navbar-header" class={showNotifications ? "navbar-header-showed" : "navbar-header-hidden"}>
		<a class="am_a_button" href='/' on:click={hideNotification}>Home page</a><br>
		<a href='/profile' class="am_a_button" on:click={hideNotification}>Profile</a><br>
		<a href='/friend' class="am_a_button" on:click={hideNotification}>
			Friends request
			<NotificationsBubble notifications={friendsNotificationsToSee} />
		</a><br>
		<a href='/parts/requests' class="am_a_button" on:click={hideNotification}>
			Parts request
			<NotificationsBubble notifications={partsNotificationsToSee} />
		</a>
		<br>
		<a href='/notifications' class="am_a_button" on:click={hideNotification}>
			Notifications
			<NotificationsBubble notifications={notifications}/>
		</a><br>
		<a href='/login' class="am_a_button" on:click={disconnect} data-sveltekit-reload>Disconnect</a>
	</nav>
	<div
		id='filled-header'
		on:click={() => showNotifications = !showNotifications}
		class={!showNotifications ? "filled-header-hidden" : "filled-header-showed"}
		aria-hidden='true'
	></div>
</header>
