<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		return {
			props: {
				groupId: page.params.groupid
			}
		};
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Fab, { Icon as FabIcon } from '@smui/fab';
	import List, { Item, Text, Meta, Graphic } from '@smui/list';
	import Snackbar, { Label, SnackbarComponentDev } from '@smui/snackbar';
	import { initAppDB } from '$lib/_modules/initGun';
	import AddExpenseDialog from '$lib/AddExpenseDialog.svelte';
	import AddMemberDialog from '$lib/AddMemberDialog.svelte';
	import { getMemberAvatarURL } from '$lib/_modules/utils';
	import ViewBalancesDialog from '$lib/ViewBalancesDialog.svelte';
	import Chip, { Set, LeadingIcon, Text as ChipText } from '@smui/chips';
	import { onSecure, setSecure } from '$lib/_modules/secure';
	import { secretKey, groupDB, groupStore, resetGroupStore } from '$lib/_modules/stores';
	import LoadingSpinnerOverlay from '$lib/LoadingSpinnerOverlay.svelte';
	import { storeRecentGroup } from '$lib/_modules/recentGroupsStorage';
	import SyncIssuesDialog from '$lib/SyncIssuesDialog.svelte';
	import TransactionsList from '$lib/TransactionsList.svelte';
	import { PLACEHOLDER_GROUP_NAME } from '$lib/_modules/constants';

	export let groupId: string;

	let openAddMemberDialog: boolean = false;
	let openAddExpenseDialog: boolean = false;
	let openViewBalancesDialog: boolean = false;
	let openSyncIssuesDialog: boolean = false;
	let copiedLinkSnackbar: SnackbarComponentDev;

	let chips = [
		{
			title: 'balances',
			icon: 'balance',
			onClick: () => (openViewBalancesDialog = true)
		},
		{
			title: 'share group',
			icon: 'share',
			onClick: () => {
				navigator.clipboard.writeText(window.location.href).then(() => copiedLinkSnackbar.open());
			}
		},
		{
			title: 'sync issues?',
			icon: 'sync_problem',
			onClick: () => (openSyncIssuesDialog = true)
		}
		// {
		// 	title: 'monthly stats',
		// 	icon: 'event',
		// 	onClick: () => {
		// 		alert('soon!');
		// 	}
		// }
	];

	onMount(() => {
		resetGroupStore();
		const appDB = initAppDB();
		$secretKey = window.location.hash;
		const GROUPID = groupId || 'unknown group';
		$groupDB = appDB.get(GROUPID);

		onSecure(
			$groupDB.get('expenses').map(),
			$secretKey,
			(plain, key) => ($groupStore.expenses[key] = plain),
			(key) => {
				delete $groupStore.expenses[key];
				$groupStore.expenses = $groupStore.expenses;
			}
		);

		onSecure(
			$groupDB.get('members').map(),
			$secretKey,
			(plain, key) => ($groupStore.members[plain.name] = plain),
			(key) => {
				delete $groupStore.members[key];
				$groupStore.members = $groupStore.members;
			}
		);

		onSecure(
			$groupDB.get('groupInfo'),
			$secretKey,
			(plain, key) => {
				$groupStore.groupInfo.name = plain.name;
				storeRecentGroup(GROUPID, $secretKey, plain.name);
			},
			(key) => {
				delete $groupStore.groupInfo[key];
				$groupStore.groupInfo = $groupStore.groupInfo;
			}
		);

		onSecure(
			$groupDB.get('payments').map(),
			$secretKey,
			(plain, key) => ($groupStore.payments[key] = plain),
			(key) => {
				delete $groupStore.payments[key];
				$groupStore.payments = $groupStore.payments;
			}
		);
	});

	const addExpense = async (expenseName: string, expenseAmount: number, memberName: string) => {
		const memberExists = memberName in $groupStore.members;
		if (!memberExists) throw SyntaxError;
		setSecure(
			$groupDB.get('expenses'),
			{
				title: expenseName,
				amount: expenseAmount,
				paidBy: memberName,
				timestamp: Date.now()
			},
			$secretKey
		);
	};

	const addMember = (memberName: string) => {
		setSecure($groupDB.get('members'), { name: memberName }, $secretKey);
	};

	$: transactions = Object.entries({ ...$groupStore.expenses, ...$groupStore.payments }).sort(
		(a, b) => b[1].timestamp - a[1].timestamp
	);
	$: members = Object.entries($groupStore.members);
</script>

<svelte:head>
	<title>splitio | {$groupStore.groupInfo.name}</title>
</svelte:head>

<div class="mdc-typography--headline5">{$groupStore.groupInfo.name}</div>

<Set
	{chips}
	style="overflow-x: auto; flex-wrap: nowrap; margin-left: -10px; margin-right: -10px"
	let:chip
>
	<Chip {chip} shouldRemoveOnTrailingIconClick={false} on:click={chip.onClick}>
		<LeadingIcon class="material-icons">{chip.icon}</LeadingIcon>
		<ChipText tabindex={0}>{chip.title}</ChipText>
	</Chip>
</Set>

<div class="mdc-typography--headline5">💸 group transactions</div>

<TransactionsList {transactions} />

<div class="mdc-typography--headline5">🤝 members</div>

<List oneLine avatarList style="margin-bottom: 70px;">
	{#each members as [key, member]}
		<Item class="rounded-item">
			<Graphic style="background-image: url({getMemberAvatarURL(member.name)});" />
			<Text>{member.name}</Text>
			<!-- <Meta class="material-icons">info</Meta> -->
		</Item>
	{/each}
	<Item on:click={() => (openAddMemberDialog = true)} class="rounded-item">
		<Text>add someone</Text>
		<Meta class="material-icons">person_add</Meta>
	</Item>
</List>

<!-- floating action button -->
<div class="flexy">
	<div class="margins">
		<Fab style="border-radius: 17px;" on:click={() => (openAddExpenseDialog = true)}>
			<FabIcon class="material-icons">post_add</FabIcon>
		</Fab>
	</div>
</div>

<!-- loading overlay -->
<LoadingSpinnerOverlay showOverlay={$groupStore.groupInfo.name === PLACEHOLDER_GROUP_NAME} />

<!-- add member dialog -->
<AddMemberDialog bind:openDialog={openAddMemberDialog} addCallback={addMember} />

<!-- add expense dialog -->
<AddExpenseDialog
	membersList={members}
	bind:openDialog={openAddExpenseDialog}
	addCallback={addExpense}
/>

<ViewBalancesDialog
	bind:openDialog={openViewBalancesDialog}
	expensesObj={$groupStore.expenses}
	paymentsObj={$groupStore.payments}
	membersList={members}
/>

<SyncIssuesDialog bind:openDialog={openSyncIssuesDialog} />

<Snackbar bind:this={copiedLinkSnackbar}>
	<Label>📋 link copied to clipboard, now share it!</Label>
</Snackbar>

<style>
	.flexy {
		/* display: flex;
		flex-wrap: wrap;
		align-items: center; */
		position: fixed;
		bottom: 10px;
		right: 10px;
		z-index: 1;
	}

	* :global(.margins) {
		margin: 0 0.4em 0.4em 0;
	}
</style>
