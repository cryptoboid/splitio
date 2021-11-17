<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				errorMsg: `${status} ${error.message}`
			}
		};
	}
</script>

<script lang="ts">
	import SplitioIcon from '$lib/SplitioIcon.svelte';
	import { redirectToHome } from '$lib/_modules/utils';
	import Button, { Label, Icon } from '@smui/button';
	import Paper, { Title, Content } from '@smui/paper';
	export let errorMsg: string = '';
</script>

<svelte:head>
	<title>splitio | error</title>
</svelte:head>

<div class="homepage-container">
	<div>
		<SplitioIcon />
	</div>
	<div class="group-text-container">
		<Paper class="paper-demo" elevation={5}>
			<Title>😞 error</Title>
			<Content>
				message: {errorMsg}

				<Button
                    href="/"
					variant="raised"
					style="display: flex; margin-top: 1rem"
					color="secondary"
				>
					<Icon class="material-icons">home</Icon>
					<Label>Return home</Label>
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
		/* padding: 0px 1px; */
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
