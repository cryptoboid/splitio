<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import { PLACEHOLDER_GROUP_NAME } from './_modules/constants';

	export let openDialog = false;
	export let addCallback: Function = () => {};

	let inputName: string = '';
</script>

<Dialog
	bind:open={openDialog}
	aria-labelledby="default-focus-title"
	aria-describedby="default-focus-content"
>
	<Title id="default-focus-title">✨ create a new group</Title>
	<Content id="default-focus-content">
		please enter your groups name:
		<Textfield bind:value={inputName} />
	</Content>
	<Actions>
		<Button>
			<Label>cancel</Label>
		</Button>
		<Button
			variant="unelevated"
			disabled={inputName === '' || inputName === PLACEHOLDER_GROUP_NAME}
			on:click={() => {
				addCallback(inputName);
				inputName = '';
			}}
		>
			<Label>create!</Label>
		</Button>
	</Actions>
</Dialog>
