<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch, session, context }) => {
		const resp = await fetch('/api/auth/logout', {
			cache: 'no-store'
		});

		if (resp.status == 200) {
			session.authenticated = false;

			return {
				status: 303,
				redirect: '/login'
			};
		}

		return {};
	};
</script>
