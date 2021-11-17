<script lang="ts">
	import Dialog, { Header, Title, Content } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import List, { Item, Text, PrimaryText, SecondaryText, Meta, Graphic } from '@smui/list';
	import PaymentsList from './PaymentsList.svelte';
	import { computeBalances, computePayments } from './_modules/money';
	import { absRounded, getMemberAvatarURL } from './_modules/utils';

	export let openDialog = false;
	export let membersList: Array<Array<string | object>> = [];
	export let expensesList: Array<Array<string | object>> = [];

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

	$: balances = computeBalances(expensesList, membersList);
	$: payments = computePayments(balances);
	$: expandedMembers = initExpMembers(membersList);
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
			{#each balances as [name, amount]}
				<Item on:click={() => toggleDebtsForMember(name)}>
					<Graphic style="background-image: url({getMemberAvatarURL(name)});" />
					<Text>
						<PrimaryText>{name}</PrimaryText>
						<SecondaryText class={amount < 0 ? 'error-text' : 'success-text'}
							>{amount < 0 ? 'owes' : 'receives'} ${absRounded(amount)}</SecondaryText
						>
					</Text>
					<Meta class="material-icons">{expandedMembers[name] ? "expand_less" : "expand_more"}</Meta>
				</Item>
				{#if expandedMembers[name]}
					<PaymentsList pendingPayments={payments[name]}/>
				{/if}
			{/each}
		</List>
	</Content>
</Dialog>
