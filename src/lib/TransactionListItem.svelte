<script lang="ts">
	import { Item, Graphic, Text, PrimaryText, SecondaryText, Meta } from '@smui/list';
	import { absRounded, timestampToShortDate } from './_modules/utils';

	export let transaction = {};
	export let onDeleteCallback: Function | undefined = undefined;

	$: isSettlement = transaction.title === undefined;
</script>

<div>
	<Item class={`rounded-item ${isSettlement ? 'settlement-item' : ''}`}>
		<Graphic style="text-align: center; width: 1.75rem;">
			{timestampToShortDate(transaction.timestamp)}
		</Graphic>
		{#if !isSettlement}
			<Text>
				<PrimaryText>{transaction.title}</PrimaryText>
				<SecondaryText>${transaction.amount} by {transaction.paidBy}</SecondaryText>
			</Text>
		{:else}
			<Text>
				<PrimaryText>{`💵 paid to ${transaction.receivedBy}`}</PrimaryText>
				<SecondaryText>${absRounded(transaction.amount)} from {transaction.paidBy}</SecondaryText>
			</Text>
		{/if}
		{#if onDeleteCallback}
			<Meta class="material-icons" on:click={onDeleteCallback}>clear</Meta>
		{/if}
	</Item>
</div>
