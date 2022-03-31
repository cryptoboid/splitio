<script lang="ts">
	import Button, { Label } from '@smui/button';

	import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';

	export let openDialog = false;
</script>

<Dialog
	bind:open={openDialog}
	aria-labelledby="default-focus-title"
	aria-describedby="default-focus-content"
>
	<Header>
		<Title id="fullscreen-title">🌐 sync troubleshooting</Title>
	</Header>
	<Content id="default-focus-content" class="mdc-typography--body1" style="white-space: pre-line;">
		all information in splitio is p2p distributed, like a torrent.

		when a group takes too long to load (or won't load), or some expenses are missing, <strong>open the group in another device at the same time</strong> to refresh the info.
	</Content>
	<Actions>
		<Button>
			<Label>ok</Label>
		</Button>
	</Actions>
</Dialog>
