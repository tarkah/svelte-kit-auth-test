<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const resp = await fetch('/api/profile');

		const profile = await resp.json();

		return {
			props: {
				profile: profile?.data
			}
		};
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ProfileData } from 'src/routes/api/_responses';

	export let profile: ProfileData;

	const onClickDelete = async () => {
		const resp = await fetch('/api/profile', {
			method: 'DELETE'
		});

		if (resp.ok) {
			goto('/logout');
		}
	};
</script>

<h1>PROFILE</h1>

{#if profile}
	<div>
		<div>
			<div>Username</div>
			<div>{profile.username}</div>
		</div>
		<div>
			<div>Email</div>
			<div>{profile.email}</div>
		</div>
		<div>
			<button on:click={onClickDelete}>Delete</button>
		</div>
	</div>
{/if}
