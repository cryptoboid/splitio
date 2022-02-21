<script context="module">
    /** @type {import('@sveltejs/kit').Load} */
	export async function load({ page }) {
		return {
			status: 400,
            error: page.query.get('msg') || 'unknown error'
		};
	}
</script>

<svelte:head>
	<title>splitio | error</title>
</svelte:head>
