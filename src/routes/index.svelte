<script lang="ts">
	import { Input } from '@smui/textfield';
	import Paper from '@smui/paper';
	import Fab from '@smui/fab';
	import { Icon } from '@smui/common';
	import SplitioIcon from '$lib/SplitioIcon.svelte';

	let groupValue = '';

	// function doSearch() {
	// 	alert('Search for ' + groupValue);
	// }

	function handleKeyDown(event: CustomEvent | KeyboardEvent) {
		event = event as KeyboardEvent;
		if (event.key === 'Enter') {
			window.location.href = '/g/' + groupValue;
		}
	}
</script>

<svelte:head>
	<title>splitio | home</title>
</svelte:head>


<div class="homepage-container">
	<div>
		<SplitioIcon />
	</div>
	<div class="group-text-container">
		<div class="mdc-typography--body1">paste your group id here:</div>
		<Paper class="solo-paper" elevation={6}>
			<Icon class="material-icons">group</Icon>
			<Input
				bind:value={groupValue}
				on:keydown={handleKeyDown}
				placeholder="Group ID"
				class="solo-input"
			/>
		</Paper>
		<Fab href="/g/{groupValue}" exited={groupValue === ''} color="secondary" class="solo-fab">
			<Icon class="material-icons">arrow_forward</Icon>
		</Fab>
	</div>
</div>

<!-- <div id="home-background" /> -->

<!-- <body class="bg"/> -->
<style>
	.homepage-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.group-text-container {
		padding: 0px 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	* :global(.solo-paper) {
		display: flex;
		align-items: center;
		flex-grow: 1;
		max-width: 600px;
		margin: 10px 12px;
		padding: 0 12px;
		height: 48px;
	}
	* :global(.solo-paper > *) {
		display: inline-block;
		margin: 0 12px;
	}
	* :global(.solo-input) {
		flex-grow: 1;
		color: var(--mdc-theme-on-surface, #000);
	}
	* :global(.solo-input::placeholder) {
		color: var(--mdc-theme-on-surface, #000);
		opacity: 0.6;
	}
	* :global(.solo-fab) {
		flex-shrink: 0;
		margin-top: 1rem
	}
</style>
