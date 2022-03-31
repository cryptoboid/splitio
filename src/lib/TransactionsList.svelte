<script lang="ts">
	import List, { Item, Graphic, Text, PrimaryText, SecondaryText } from '@smui/list';
	import ConfirmDeleteTxDialog from './ConfirmDeleteTxDialog.svelte';
	import TransactionListItem from './TransactionListItem.svelte';

	export let transactions = [];

	const INITIAL_MAX_SHOW = 5;
	const INC_MAX_SHOW = 10;
	let maxShownTx = INITIAL_MAX_SHOW;

	let openConfirmDeleteDialog: boolean = false;
	let confirmDeleteTx = {};
</script>

<List twoLine avatarList>
	{#each transactions.slice(0, maxShownTx) as [key, transaction]}
		<TransactionListItem
			{transaction}
			onDeleteCallback={() => {
				confirmDeleteTx = transaction;
				confirmDeleteTx.key = key;
				openConfirmDeleteDialog = true;
			}}
		/>
	{/each}
	{#if !transactions.length}
		<Item disabled class="rounded-item">
			<Text>
				<PrimaryText>nothing yet...</PrimaryText>
				<SecondaryText>add a new expense with the plus sign</SecondaryText>
			</Text>
		</Item>
	{/if}
	{#if transactions.length > maxShownTx}
		<Item
			class="rounded-item"
			on:click={() => (maxShownTx += Math.min(transactions.length - maxShownTx, INC_MAX_SHOW))}
			style="max-height: 48px; color: grey"
		>
			<Graphic class="material-icons" style="width: 1.75rem;">expand_more</Graphic>
			<Text>
				<PrimaryText style="margin-top: -3px">
					show {Math.min(transactions.length - maxShownTx, INC_MAX_SHOW)} more...
				</PrimaryText>
			</Text>
		</Item>
	{/if}
</List>

<ConfirmDeleteTxDialog bind:openDialog={openConfirmDeleteDialog} transaction={confirmDeleteTx} />
