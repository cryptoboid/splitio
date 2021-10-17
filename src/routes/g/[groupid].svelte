<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		return {
			props: {
				groupId: page.params.groupid
			}
		}
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Fab, { Icon as FabIcon } from '@smui/fab';
	import List, { Item, Text, PrimaryText, SecondaryText, Meta, Graphic } from '@smui/list';
	import { GUN } from '../../_modules/initGun';

	// import user from '../_modules/user';

	export let groupId: string;

	let groupDB = undefined;

	onMount(() => {
		// getUserOrShowLogin();

		const db = GUN.get('splitio');
		const GROUPID = groupId || 'unknown group';
		groupDB = db.get(GROUPID);

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
					store.members[key] = member.name;
				} else {
					// A key may contain a null value (if data has been deleted/set to null)
					// if so, we remove the item from the store
					delete store.members[key];
					store.members = store.members;
				}
			});
	});

	const createExpense = async (userTitle: string, userAmount: number) => {
		const name = "cryptoboid";//getUsername();
		if (!name) throw SyntaxError;
		groupDB
			.get("expenses")
			.set({
				title: userTitle,
				amount: userAmount,
				paidBy: name
			});
		// newAmount = 0;
		// newTitle = "";
	};

	const removeExpense = (key: string) => {
		groupDB.get("expenses").get(key).put(null);
	};

	let store: object = { expenses: {}, members: {}, groupInfo: {} };
	$: expenses = Object.entries(store.expenses);
	$: members = Object.entries(store.members);
</script>

<svelte:head>
	<title>splitio | {groupId}</title>
</svelte:head>

<br /><br /><br />
<div class="mdc-typography--headline5">Awesome ski trip</div>
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
</List>

<div class="mdc-typography--headline5">🤝 members</div>

<List oneLine avatarList>
	{#each members as [key, member]}
	<Item disabled>
		<Graphic style="background-image: url(https://place-hold.it/40x40?text=CH&fontsize=16);" />
		<Text>charles</Text>
		<Meta class="material-icons">clear</Meta>
	</Item>
	{/each}
</List>

<!-- <Button on:mousedown={handleClick} style="border-radius: 0px;">
	<Icon class="material-icons">thumb_up</Icon>
	<Label>Click Me</Label>
</Button>
<p class="mdc-typography--body1">
	{#if clicked}
		You've clicked the button {clicked} time{clicked === 1 ? '' : 's'}. Middle click the button to
		reset.
	{:else}
		<span class="grayed">You haven't clicked the button.</span>
	{/if}
</p> -->

<div class="flexy">
	<div class="margins">
		<Fab style="border-radius: 17px;" on:click={() => createExpense("hosting budget", 0.01)}>
			<FabIcon class="material-icons">add</FabIcon>
		</Fab>
	</div>
</div>

<style>
	.flexy {
		/* display: flex;
		flex-wrap: wrap;
		align-items: center; */
		position: fixed;
		bottom: 82px;
		right: 10px;
		z-index: 1;
	}
	* :global(.margins) {
		margin: 0 0.4em 0.4em 0;
	}
</style>
