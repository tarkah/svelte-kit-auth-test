<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch, session }) => {
		const resp = await fetch('/api/auth/verify');

		// Workaround to get this function to trigger on every router change
		if (page.path) {
			//
		}

		if (resp.status === 200) {
			const body = await resp.json();

			if (body?.verified === true) {
				return {};
			}
		}

		session.authenticated = false;

		return {
			status: 303,
			redirect: '/login'
		};
	};
</script>

<slot />
