<script lang="ts">
	import { Title as TopTitle } from '@smui/top-app-bar';
	import Ripple from '@smui/ripple';

	export let isTopApp = false;
</script>

{#if isTopApp}
	<div
		use:Ripple={{ surface: true }}
		tabindex="0"
		style="display: flex; flex-direction: row; align-items: center;"
		on:click={() => (window.location.href = '/')}
	>
		<img
			src="https://static.thenounproject.com/png/1894381-84.png"
			height="36px"
			alt="icon"
			style="margin-left: 5px"
			href="/"
		/>
		<TopTitle style="font-family: Josefin Sans;font-size: x-large;margin-left: -17px;">
			splitio
		</TopTitle>
	</div>
{:else}
	<div
		use:Ripple={{ surface: true }}
		on:click={() => (window.location.href = '/')}
		style="align-items: center; display: flex; flex-direction: column;"
	>
		<img src="https://static.thenounproject.com/png/1894381-84.png" height="90rem" alt="icon" />
		<div class="logo-home">splitio</div>
	</div>
{/if}

<style>
	.logo-home {
		font-family: Josefin Sans;
		font-size: 3rem;
		margin-bottom: 3rem;
	}

	[tabindex='0'] {
		cursor: pointer;
	}
</style>
