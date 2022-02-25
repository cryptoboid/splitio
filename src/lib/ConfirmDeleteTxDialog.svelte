<script lang="ts">
	import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import List from '@smui/list';
	import TransactionListItem from './TransactionListItem.svelte';
	import { removeTransaction } from './_modules/money';

	export let openDialog = false;
	export let transaction = {};
</script>

<Dialog
	bind:open={openDialog}
	aria-labelledby="default-focus-title"
	aria-describedby="default-focus-content"
>
	<Title id="default-focus-title">⚠️ delete transaction?</Title>
	<Content id="default-focus-content">
		<List twoLine avatarList>
			<TransactionListItem {transaction} />
		</List>
		<p>this will delete the selected transaction from the group. continue?</p>
	</Content>
	<Actions>
		<Button use={[InitialFocus]}>
			<Label>cancel</Label>
		</Button>
		<Button
			variant="unelevated"
			on:click={() => {
				removeTransaction(transaction.key, transaction);
			}}
		>
			<Label>delete</Label>
		</Button>
	</Actions>
</Dialog>
