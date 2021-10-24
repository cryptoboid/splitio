<script lang="ts">
	import Dialog, { Header, Title, Content } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import List, { Item, Text, PrimaryText, SecondaryText, Meta, Graphic } from '@smui/list';
	import { getMemberAvatarURL } from './_modules/utils';

	export let openDialog = false;
	export let membersList: Array<Array<string | object>> = [];
	export let expensesList: Array<Array<string | object>> = [];

	const computeBalances = (allexpenses, allMembers) => {
		if (!allexpenses || allMembers.length === 0) return [];
		// console.log(allMembers);
		let total = allexpenses.map((x) => x[1].amount).reduce((a, b) => a + b, 0);
		let numMembers = allMembers.length;
		let eachUserBalance = {};

		for (const member of allMembers) {
			eachUserBalance[member[0]] = 0;
		}

		for (const expense of allexpenses) {
			let payer = expense[1].paidBy;
			eachUserBalance[payer] += expense[1].amount;
		}

		for (let [usr, balance] of Object.entries(eachUserBalance)) {
			eachUserBalance[usr] = balance - total / numMembers;
		}

		return Object.entries(eachUserBalance);
	};

	$: balances = computeBalances(expensesList, membersList);
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
				<Item>
					<Graphic style="background-image: url({getMemberAvatarURL(name)});" />
					<Text>
						<PrimaryText>{name}</PrimaryText>
						<SecondaryText class={amount < 0 ? 'error-text' : 'success-text'}
							>{amount < 0 ? 'owes' : 'receives'} ${Math.abs(amount)}</SecondaryText
						>
					</Text>
					<!-- <Meta class="material-icons">info</Meta> -->
				</Item>
			{/each}
		</List>

		<!-- <LayoutGrid>
			<Cell span={12}>
				enter a description:
				<Textfield bind:value={inputName} />
			</Cell>
			<Cell span={12}>
				enter the $ amount:
				<Textfield type="number" bind:value={inputAmount} />
			</Cell>
			<Cell span={12}>
				who payed?
				<Select bind:value={inputPaidBy}>
					<Icon
						slot="leadingIcon"
						style="background-image: url({getMemberAvatarURL(inputPaidBy, 24)});"
					/>
					<Option value="" />
					{#each membersList as [key, member]}
						<Option value={member.name}>
							<Graphic
								style="background-image: url({getMemberAvatarURL(member.name, 24)});"
							/>{member.name}</Option
						>
					{/each}
				</Select>
			</Cell>
		</LayoutGrid> -->
	</Content>
</Dialog>
