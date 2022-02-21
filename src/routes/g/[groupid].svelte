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
	import List, { Item, Text, PrimaryText, SecondaryText, Meta, Graphic } from '@smui/list';
	import { getSEA, initAppDB } from '$lib/_modules/initGun';
	import AddExpenseDialog from '$lib/AddExpenseDialog.svelte';
	import AddMemberDialog from '$lib/AddMemberDialog.svelte';
	import { getMemberAvatarURL, timestampToShortDate } from '$lib/_modules/utils';
	import ViewBalancesDialog from '$lib/ViewBalancesDialog.svelte';
	import Chip, { Set, LeadingIcon, Text as ChipText } from '@smui/chips';
	import { onSecure, putSecure, setSecure } from '$lib/_modules/secure';

	// import user from '../_modules/user';

	export let groupId: string;

	let groupDB: any = undefined;
	let SEA: any = undefined;
	let secretKey: string = '';

	let openAddMemberDialog: boolean = false;
	let openAddExpenseDialog: boolean = false;
	let openViewBalancesDialog: boolean = false;

	let chips = [
		{
			title: 'balances',
			icon: 'balance',
			onClick: () => (openViewBalancesDialog = true)
		},
		{
			title: 'monthly stats',
			icon: 'event',
			onClick: () => {
				alert('soon!');
			}
		}
	];

	onMount(() => {
		const appDB = initAppDB();
		SEA = getSEA();
		secretKey = window.location.hash;
		const GROUPID = groupId || 'unknown group';
		groupDB = appDB.get(GROUPID);

		onSecure(
			groupDB.get('expenses').map(),
			secretKey,
			(plain, key) => (store.expenses[key] = plain),
			(key) => {
				delete store.expenses[key];
				store.expenses = store.expenses;
			}
		);

		onSecure(
			groupDB.get('members').map(),
			secretKey,
			(plain, key) => (store.members[plain.name] = plain),
			(key) => {
				delete store.members[key];
				store.members = store.members;
			}
		);

		onSecure(
			groupDB.get('groupInfo'),
			secretKey,
			(plain, key) => (store.groupInfo.name = plain.name),
			(key) => {
				delete store.groupInfo[key];
				store.groupInfo = store.groupInfo;
			}
		);
	});

	const addExpense = async (expenseName: string, expenseAmount: number, memberName: string) => {
		const memberExists = memberName in store.members;
		if (!memberExists) throw SyntaxError;
		setSecure(
			groupDB.get('expenses'),
			{
				title: expenseName,
				amount: expenseAmount,
				paidBy: memberName,
				timestamp: Date.now()
			},
			secretKey
		);
	};

	const removeExpense = (key: string) => {
		groupDB.get('expenses').get(key).put(null);
	};

	const addMember = (memberName: string) => {
		setSecure(groupDB.get('members'), { name: memberName }, secretKey);
		// groupDB.get('members').get(memberName).put({ name: memberName });
	};

	let store: object = { expenses: {}, members: {}, groupInfo: { name: 'loading...' } };
	$: expenses = Object.entries(store.expenses).sort((a, b) => b[1].timestamp - a[1].timestamp);
	$: members = Object.entries(store.members);
</script>

<svelte:head>
	<title>splitio | {store.groupInfo.name}</title>
</svelte:head>

<div class="mdc-typography--headline5">{store.groupInfo.name}</div>

<Set {chips} let:chip>
	<Chip {chip} shouldRemoveOnTrailingIconClick={false} on:click={chip.onClick}>
		<LeadingIcon class="material-icons">{chip.icon}</LeadingIcon>
		<ChipText tabindex={0}>{chip.title}</ChipText>
	</Chip>
</Set>

<div class="mdc-typography--headline5">💸 group expenses</div>

<List twoLine avatarList>
	{#each expenses as [key, expense]}
		<Item>
			<Graphic style="text-align: center; width: 1.75rem;">
				{timestampToShortDate(expense.timestamp)}
			</Graphic>
			<Text>
				<PrimaryText>{expense.title}</PrimaryText>
				<SecondaryText>${expense.amount} by {expense.paidBy}</SecondaryText>
			</Text>
			<Meta class="material-icons" on:click={() => removeExpense(key)}>clear</Meta>
		</Item>
	{/each}
	{#if !expenses.length}
		<Item disabled>
			<Text>
				<PrimaryText>nothing yet...</PrimaryText>
				<SecondaryText>add a new expense with the plus sign</SecondaryText>
			</Text>
		</Item>
	{/if}
</List>

<div class="mdc-typography--headline5">🤝 members</div>

<List oneLine avatarList style="margin-bottom: 70px;">
	{#each members as [key, member]}
		<Item>
			<Graphic style="background-image: url({getMemberAvatarURL(member.name)});" />
			<Text>{member.name}</Text>
			<!-- <Meta class="material-icons">info</Meta> -->
		</Item>
	{/each}
	<Item on:click={() => (openAddMemberDialog = true)}>
		<Text>add someone</Text>
		<Meta class="material-icons">person_add</Meta>
	</Item>
</List>

<div class="flexy">
	<div class="margins">
		<Fab style="border-radius: 17px;" on:click={() => (openAddExpenseDialog = true)}>
			<FabIcon class="material-icons">post_add</FabIcon>
		</Fab>
	</div>
</div>

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
	expensesList={expenses}
	membersList={members}
/>

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
