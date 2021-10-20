<script lang="ts">
  	import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
  	import IconButton from '@smui/icon-button';
  	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Select, { Option } from '@smui/select';
	import Icon from '@smui/select/icon';
	import { Graphic } from '@smui/list';
import { getMemberAvatarURL } from './_modules/utils';

	export let openDialog = false;
	export let addCallback: Function = () => {};
	export let membersList: Array<Array<string | object>> = [];

	let inputName: string = '';
	let inputAmount: number = 0.0;
	let inputPaidBy: string = '';
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
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		asdsadasasdsadasa
		
	</Content>
	<Actions>
		<Button>
			<Label>cancel</Label>
		</Button>
		<Button
			variant="unelevated"
			disabled={inputName === '' || inputAmount === 0.0 || inputPaidBy === ''}
			on:click={() => {
				addCallback(inputName, inputAmount, inputPaidBy);
				inputName = '';
				inputAmount = 0.0;
				inputPaidBy = '';
			}}
		>
			<Label>add</Label>
		</Button>
	</Actions>
</Dialog>
