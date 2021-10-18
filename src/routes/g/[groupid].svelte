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
	import { initAppDB } from '$lib/_modules/initGun';
	import AddExpenseDialog from '$lib/AddExpenseDialog.svelte';
	import AddMemberDialog from '$lib/AddMemberDialog.svelte';

	// import user from '../_modules/user';

	export let groupId: string;

	let groupDB: any = undefined;

	let openAddMemberDialog: boolean = false;
	let openAddExpenseDialog: boolean = false;

	onMount(() => {
		const appDB = initAppDB();
		const GROUPID = groupId || 'unknown group';
		groupDB = appDB.get(GROUPID);

		groupDB
			.get('expenses')
			.map()
			.on(async function (expense, key) {
				if (expense && typeof expense === 'object') {
					// Updates the store with the new value
					store.expenses[key] = expense;
					store.expenses[key].gunID = key;
				} else {
					// A key may contain a null value (if data has been deleted/set to null)
					// if so, we remove the item from the store
					delete store.expenses[key];
					store.expenses = store.expenses;
				}
			});

		groupDB
			.get('members')
			.map()
			.on((member, key) => {
				if (member) {
					// Updates the store with the new value
					store.members[key] = member;
				} else {
					// A key may contain a null value (if data has been deleted/set to null)
					// if so, we remove the item from the store
					delete store.members[key];
					store.members = store.members;
				}
			});

		groupDB
			.get('groupInfo')
			.get('name')
			.on((data, key) => {
				console.log(data, key);
				if (data) {
					// Updates the store with the new value
					store.groupInfo.name = data;
				} else {
					// A key may contain a null value (if data has been deleted/set to null)
					// if so, we remove the item from the store
					delete store.groupInfo[key];
					store.groupInfo = store.groupInfo;
				}
			});
	});

	const addExpense = async (expenseName: string, expenseAmount: number, memberName: string) => {
		const memberExists = memberName in store.members;
		if (!memberExists) throw SyntaxError;
		groupDB.get('expenses').set({
			title: expenseName,
			amount: expenseAmount,
			paidBy: memberName
		});
	};

	const removeExpense = (key: string) => {
		groupDB.get('expenses').get(key).put(null);
	};

	const addMember = (memberName: string) => {
		groupDB.get('members').get(memberName).put({ name: memberName });
	};

	let store: object = { expenses: {}, members: {}, groupInfo: {name: '... loading'} };
	$: expenses = Object.entries(store.expenses);
	$: members = Object.entries(store.members);
</script>

<svelte:head>
	<title>splitio | {store.groupInfo.name}</title>
</svelte:head>

<div class="mdc-typography--headline5">{store.groupInfo.name}</div>
<br />
<div class="mdc-typography--headline5">💸 group expenses</div>

<List twoLine>
	{#each expenses as [key, expense]}
		<Item on:click={() => removeExpense(key)}>
			<Text>
				<PrimaryText>{expense.title}</PrimaryText>
				<SecondaryText>${expense.amount} by {expense.paidBy}</SecondaryText>
			</Text>
			<Meta class="material-icons">clear</Meta>
		</Item>
	{/each}
	{#if !members.length}
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
			<Graphic
				style="background-image: url(https://source.boringavatars.com/beam/40/{member.name}?colors=4DAB8C,542638,8F244D,C9306B,E86F9E);"
			/>
			<Text>{member.name}</Text>
			<Meta class="material-icons">info</Meta>
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
			<FabIcon class="material-icons">add</FabIcon>
		</Fab>
	</div>
</div>

<!-- add member dialog -->
<AddMemberDialog bind:openDialog={openAddMemberDialog} addCallback={addMember}/>


<!-- add expense dialog -->
<AddExpenseDialog membersList={members} bind:openDialog={openAddExpenseDialog} addCallback={addExpense}/>

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
