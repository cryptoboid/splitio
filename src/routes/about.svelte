<script lang="ts">
	import SplitioIcon from '$lib/SplitioIcon.svelte';
	import Button, { Label, Icon } from '@smui/button';
	import Paper, { Title, Content } from '@smui/paper';
</script>

<svelte:head>
	<title>splitio | about</title>
</svelte:head>

<div class="homepage-container">
	<div>
		<SplitioIcon />
	</div>
	<div class="group-text-container">
		<Paper class="paper-demo" elevation={5}>
			<Title>ℹ️ about</Title>
			<Content style="white-space: pre-line;">
				split your bills easily! splitio is an open-source webapp built for tracking debts and payments quickly, without any user accounts.

				all info is shared in a p2p fashion (like a torrent), so make sure to connect with your friends at the same time if something goes wrong.

				built by cryptoboid with SvelteKit and GunDB.
				<Button
					on:click={() => {}}
					variant="raised"
					href="https://github.com/cryptoboid/splitio"
					target="_blank"
					rel="noopener noreferrer"
					style="display: flex; margin-top: 1rem"
				>
					<Label>GitHub</Label>
					<Icon class="material-icons">open_in_new</Icon>
				</Button>
			</Content>
		</Paper>
	</div>
</div>

<style>
	.homepage-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.group-text-container {
		margin-top: 1.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	* :global(.info-btn) {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}

	* :global(.paper-demo) {
		margin: 0 1rem;
		max-width: 600px;
	}
</style>
