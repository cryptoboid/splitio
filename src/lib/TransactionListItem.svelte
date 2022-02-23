<script lang="ts">
	import { Item, Graphic, Text, PrimaryText, SecondaryText, Meta } from '@smui/list';
	import { removeExpense, removePayment } from './_modules/money';
	import { absRounded, timestampToShortDate } from './_modules/utils';

	export let transaction = {};
	export let key = '';
</script>

<Item>
	<Graphic style="text-align: center; width: 1.75rem;">
		{timestampToShortDate(transaction.timestamp)}
	</Graphic>
	{#if transaction.title}
		<Text>
			<PrimaryText>{transaction.title}</PrimaryText>
			<SecondaryText>${transaction.amount} by {transaction.paidBy}</SecondaryText>
		</Text>
		<Meta class="material-icons" on:click={() => removeExpense(key)}>clear</Meta>
	{:else}
		<Text>
			<PrimaryText>{`💵 paid to ${transaction.receivedBy}`}</PrimaryText>
			<SecondaryText>${absRounded(transaction.amount)} from {transaction.paidBy}</SecondaryText>
		</Text>
		<Meta class="material-icons" on:click={() => removePayment(key)}>clear</Meta>
	{/if}
</Item>
