<script lang="ts">
	import { Input } from '@smui/textfield';
	import Paper from '@smui/paper';
	import Fab from '@smui/fab';
	import { Icon } from '@smui/common';
	import SplitioIcon from '$lib/SplitioIcon.svelte';
	import Button, { Label } from '@smui/button';
	import CreateGroupDialog from '$lib/CreateGroupDialog.svelte';
	import { onMount } from 'svelte';
	import { getSEA, initAppDB } from '$lib/_modules/initGun';
	import { redirectToGroup } from '$lib/_modules/utils';
	import { putSecure } from '$lib/_modules/secure';
	import Group from '@smui/button/Group.svelte';

	let groupValue = '';
	let openCreateGroupDialog: boolean = false;

	function handleKeyDown(event: CustomEvent | KeyboardEvent) {
		event = event as KeyboardEvent;
		if (event.key === 'Enter') {
			redirectToGroup(groupValue);
		}
	}

	let appDB: any = undefined;
	let SEA: any = undefined;

	onMount(() => {
		appDB = initAppDB();
		SEA = getSEA();
	});

	const createGroup = async (groupName: string) => {
		const result = appDB.set({ expenses: {}, members: {}, groupInfo: {} });
		const secretKey = '#'+(await SEA.pair()).priv;
		const nodeid = result._.has;
		console.log(result, result._.has);
		let infoNode = appDB.get(nodeid).get('groupInfo');
		putSecure(infoNode, { name: groupName }, secretKey, (ack) => {
			if (!ack.err) redirectToGroup(nodeid, secretKey);
		});
		// appDB.get(nodeid).get('groupInfo').get('name').once((da) => console.log("NODENAME:", da));
	};
</script>

<svelte:head>
	<title>splitio | home</title>
</svelte:head>

<div class="homepage-container">
	<div>
		<SplitioIcon />
	</div>
	<div class="group-text-container">
		<Button
			style="border-radius: 17px; margin: 1.5rem"
			variant="raised"
			color="secondary"
			on:click={() => (openCreateGroupDialog = true)}
		>
			<Icon class="material-icons">add</Icon>
			<Label>create group</Label>
		</Button>
		<div class="mdc-typography--body1">or paste your group id here:</div>
		<Paper class="solo-paper" elevation={4}>
			<Icon class="material-icons">group</Icon>
			<Input
				bind:value={groupValue}
				on:keydown={handleKeyDown}
				placeholder="Group ID"
				class="solo-input"
			/>
		</Paper>
		<Fab
			on:click={() => redirectToGroup(groupValue)}
			exited={groupValue === ''}
			color="secondary"
			class="solo-fab"
		>
			<Icon class="material-icons">arrow_forward</Icon>
		</Fab>
	</div>
</div>

<CreateGroupDialog bind:openDialog={openCreateGroupDialog} addCallback={createGroup} />

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

	* :global(.solo-paper) {
		display: flex;
		align-items: center;
		flex-grow: 1;
		max-width: 600px;
		margin: 1rem 12px;
		padding: 0 12px;
		height: 48px;
	}
	* :global(.solo-paper > *) {
		display: inline-block;
		margin: 0 12px;
	}
	* :global(.solo-input) {
		flex-grow: 1;
		color: var(--mdc-theme-on-surface, gray);
	}
	* :global(.solo-input::placeholder) {
		color: var(--mdc-theme-on-surface, gray);
		opacity: 0.6;
	}
	* :global(.solo-fab) {
		flex-shrink: 0;
		margin-top: 0rem;
	}
</style>
