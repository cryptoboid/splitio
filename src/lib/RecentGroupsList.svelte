<script lang="ts">
	import Paper, { Title, Content } from '@smui/paper';
	import { Item, Text, Meta } from '@smui/list';
	import { getRecentGroups } from './_modules/recentGroupsStorage';
	import { onMount } from 'svelte';
	import { redirectToGroup } from './_modules/utils';
	import { slide } from 'svelte/transition';

	let recentGroups: object[] = [];
	onMount(() => {
		recentGroups = getRecentGroups();
	});
</script>

{#if recentGroups.length !== 0}
	<div in:slide={{ delay: 0, duration: 600 }}>
		<Paper elevation={5} class="recent-paper">
			<Title>🕐 recent groups</Title>
			<Content>
				{#each recentGroups as item}
					<Item class="rounded-item" on:click={() => redirectToGroup(item.groupId, item.secretKey)}>
						<Text>
							{item.groupName}
							<p class="footer">- id: {item.groupId}</p>
						</Text>
						<Meta class="material-icons">arrow_forward</Meta>
					</Item>
				{/each}
			</Content>
		</Paper>
	</div>
{:else}
	<div />
{/if}

<style>
	* :global(.recent-paper) {
		margin: 0.5rem 0rem;
		min-width: 250px;
		max-width: 300px;
	}

	.footer {
		/* text-align: center; */
		display: inline;
		color: grey;
		/* height: 33px; */
	}
</style>
