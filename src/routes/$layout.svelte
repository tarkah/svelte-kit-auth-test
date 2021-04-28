<script lang="ts">
	import { session } from '$app/stores';
</script>

<nav>
	{#if $session.authenticated}
		<a href="/private">App</a>
		<a href="/private/profile">Profile</a>
		<a href="/logout">Logout</a>
	{:else}
		<a href="/">Home</a>
		<a href="/login">Login</a>
		<a href="/signup">Sign Up</a>
	{/if}
</nav>

<slot />
