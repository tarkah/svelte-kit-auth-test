<script lang="ts" context="module">
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	let username;
	let password;
	let error = '';

	const onSubmit = async () => {
		error = '';
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username: username, password: password })
		});
		switch (response.status) {
			case 200: {
				$session.authenticated = true;

				goto('/private');

				break;
			}
			default: {
				error = 'Login Failed';
				break;
			}
		}
	};
</script>

<h1>LOGIN PAGE</h1>

<form on:submit|preventDefault={onSubmit}>
	<div>
		<label for="username"> Username </label>
		<input id="username" bind:value={username} />
		<label for="password"> Password </label>
		<input id="password" type="password" placeholder="******************" bind:value={password} />
		<p>{error}</p>
	</div>
	<div>
		<button type="submit"> Submit </button>
	</div>
</form>
