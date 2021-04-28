<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch, session, context }) => {
		const resp = await fetch('/api/auth/verify');

		// Workaround to get this function to trigger on every router change
		if (page.path) {
		}

		if (resp.status === 200) {
			return {};
		}

		return {
			status: 303,
			redirect: '/login'
		};
	};
</script>

<slot />
