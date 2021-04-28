<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	let username;
	let email;
	let password;
	let error = '';

	const onSubmit = async () => {
		error = '';
		const response = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username: username, email: email, password: password })
		});
		switch (response.status) {
			case 200: {
				$session.authenticated = true;

				goto('/private');

				break;
			}
			default: {
				error = 'TBD';
				break;
			}
		}
	};
</script>

<h1>SIGNUP PAGE</h1>

<form on:submit|preventDefault={onSubmit}>
	<div>
		<label for="username"> Username </label>
		<input id="username" bind:value={username} />
		<label for="email"> Email </label>
		<input id="email" bind:value={email} />
		<label for="password"> Password </label>
		<input id="password" type="password" placeholder="******************" bind:value={password} />
		<p>{error}</p>
	</div>
	<div>
		<button type="submit"> Submit </button>
	</div>
</form>
