<script lang="ts">
	import { goto } from '$app/navigation';
	import Button, { Label } from '@smui/button';
	import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
	import { GroupNodeStates } from './_modules/types';

	export let groupNodeState = GroupNodeStates.Unknown;
	$: notFound = groupNodeState === GroupNodeStates.NotFound;
</script>

<svelte:head>
	{#if notFound}
		<title>splitio | not found</title>
	{/if}
</svelte:head>

<Dialog
	open={notFound}
	aria-labelledby="default-focus-title"
	aria-describedby="default-focus-content"
	scrimClickAction=""
	escapeKeyAction=""
>
	<Header>
		<Title id="fullscreen-title">❌ group not found</Title>
	</Header>
	<Content id="default-focus-content" class="mdc-typography--body1" style="white-space: pre-line;">
		couldn't find group, please check the URL is correct.
		
		if this group exists, please ask a friend to open this URL at the same time to refresh the info.
	</Content>
	<Actions>
		<Button on:click={() => goto('/')}>
			<Label>return home</Label>
		</Button>
		<Button on:click={() => (window.location.href = window.location.href)}>
			<Label>reload</Label>
		</Button>
	</Actions>
</Dialog>
