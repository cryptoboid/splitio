<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import { Icon } from '@smui/common';
	import SplitioIcon from '$lib/SplitioIcon.svelte';
	import Button, { Label } from '@smui/button';
	import CreateGroupDialog from '$lib/CreateGroupDialog.svelte';
	import { getSEA, initAppDB } from '$lib/_modules/initGun';
	import { redirectToAbout, redirectToGroup } from '$lib/_modules/utils';
	import { putSecure } from '$lib/_modules/secure';
	import IconButton from '@smui/icon-button/IconButton.svelte';
	import type { IGunStaticSEA } from 'gun/types/static/sea';
	import LoadingSpinnerOverlay from '$lib/LoadingSpinnerOverlay.svelte';
	import RecentGroupsList from '$lib/RecentGroupsList.svelte';

	let groupValue = '';
	let openCreateGroupDialog: boolean = false;
	let showLoadingSpinner: boolean = false;

	function handleKeyDown(event: CustomEvent | KeyboardEvent) {
		event = event as KeyboardEvent;
		if (event.key === 'Enter') {
			redirectToGroup(groupValue, window.location.hash);
		}
	}

	let appDB: any = undefined;
	let SEA: IGunStaticSEA | undefined = undefined;

	const initGunIfNew = () => {
		if (!appDB) appDB = initAppDB();
		if (!SEA) SEA = getSEA();
	};

	const createGroup = async (groupName: string) => {
		showLoadingSpinner = true;
		const result = appDB.set({ expenses: {}, members: {}, groupInfo: {} });
		const secretKey = '#' + (await SEA.pair()).priv;
		const nodeid = result._.has;
		console.log(result, result._.has);
		let infoNode = appDB.get(nodeid).get('groupInfo');
		putSecure(infoNode, { name: groupName }, secretKey, (ack) => {
			if (!ack.err) {
				redirectToGroup(nodeid, secretKey);
			} else {
				alert('error creating group :( please try again. code: ' + ack.err);
				showLoadingSpinner = false;
			}
		});
	};
</script>

<SvelteSeo
	title='splitio | home'
	description='split your bills easily! splitio is an open-source webapp built for tracking debts and payments quickly, without any user accounts.'
	openGraph={{
		title: 'splitio | split your bills easily!',
		description: 'splitio is an open-source webapp built for tracking debts and payments quickly, without any user accounts.',
		url: 'https://github.com/cryptoboid/splitio',
		type: 'website',
		images: [
			{
				url: 'https://raw.githubusercontent.com/cryptoboid/splitio/main/static/splitio_banner.png',
				width: 1280,
				height: 640,
				alt: 'splitio promotion banner'
			}
		]
	}}
/>

<div class="homepage-container">
	<SplitioIcon />
	<div class="group-text-container">
		<RecentGroupsList />
		<Button
			style="border-radius: 17px; margin: 1rem"
			variant="raised"
			color="secondary"
			on:click={() => {
				openCreateGroupDialog = true;
				initGunIfNew();
			}}
		>
			<Icon class="material-icons">add</Icon>
			<Label>create group</Label>
		</Button>
		<!-- <div class="mdc-typography--body1">or paste your group id here:</div>
		<Paper class="solo-paper" elevation={5}>
			<Icon class="material-icons">group</Icon>
			<Input
				bind:value={groupValue}
				on:keydown={handleKeyDown}
				placeholder="Group ID"
				class="solo-input"
			/>
			<Fab
				on:click={() => redirectToGroup(groupValue, window.location.hash)}
				exited={groupValue === ''}
				color="secondary"
				class="solo-fab"
			>
				<Icon class="material-icons">arrow_forward</Icon>
			</Fab>
		</Paper> -->
	</div>
	<IconButton
		on:click={() => redirectToAbout()}
		class="material-icons info-btn"
		aria-label="Information">info</IconButton
	>
</div>

<LoadingSpinnerOverlay showOverlay={showLoadingSpinner} />

<CreateGroupDialog bind:openDialog={openCreateGroupDialog} addCallback={createGroup} />

<style>
	.homepage-container {
		min-height: calc(100vh - 2rem);
		padding-top: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	@media (max-width: 500px) {
		.homepage-container {
			padding-top: 5rem;
			min-height: calc(100vh - 5rem);
		}
	}

	.group-text-container {
		/* padding: 0px 1px; */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 1.5rem;
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
		height: 60px;
		width: 60px;
		/* margin-top: 0rem; */
	}

	* :global(.info-btn) {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
</style>
