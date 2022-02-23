<script lang="ts">
	import Dialog, { Header, Title, Content } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import List from '@smui/list';
	import BalancesListItem from './BalancesListItem.svelte';
	import PaymentsList from './PaymentsList.svelte';
	import RecordPaymentDialog from './RecordPaymentDialog.svelte';
	import { computeBalances, computePayments } from './_modules/money';

	export let openDialog = false;
	export let membersList: Array<Array<string | object>> = [];
	export let expensesObj: object = {};
	export let paymentsObj: object = {};

	const initExpMembers = (membersList) => {
		let result = {};
		for (const member of membersList) {
			result[member[0]] = false;
		}
		return result;
	};

	const toggleDebtsForMember = (name: string): void => {
		expandedMembers[name] = !expandedMembers[name];
	};

	$: balances = computeBalances(expensesObj, membersList, paymentsObj);
	$: payments = computePayments(balances);
	$: expandedMembers = initExpMembers(membersList);

	// Record Payments Dialog variables

	let openRecordPayment = false;
	let receiverName = '';
	let debtAmount = 0.0;
	let payerName = '';

	const showRecordPaymentDialog = (rcvrName: string, debtAmnt: number, pyrName: string) => {
		receiverName = rcvrName;
		debtAmount = debtAmnt;
		payerName = pyrName;
		openRecordPayment = true;
	};
</script>

<Dialog
	fullscreen
	bind:open={openDialog}
	aria-labelledby="default-focus-title"
	aria-describedby="default-focus-content"
>
	<Header>
		<Title id="fullscreen-title">⚖️ balances</Title>
		<IconButton action="close" class="material-icons">close</IconButton>
	</Header>
	<Content id="default-focus-content">
		<List twoLine avatarList style="margin-bottom: 70px;">
			{#each balances as [payerName, amount]}
				<BalancesListItem
					isExpanded={expandedMembers[payerName]}
					{payerName}
					{amount}
					onClickCallback={() => toggleDebtsForMember(payerName)}
				/>
				{#if expandedMembers[payerName]}
					<PaymentsList
						showRecordPaymentCallback={showRecordPaymentDialog}
						pendingPayments={payments[payerName]}
						{payerName}
					/>
				{/if}
			{/each}
		</List>
	</Content>

	<RecordPaymentDialog
		slot="over"
		bind:openDialog={openRecordPayment}
		{receiverName}
		{debtAmount}
		{payerName}
	/>
</Dialog>
