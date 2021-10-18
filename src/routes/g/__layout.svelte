<script lang="ts">
	import TopAppBar, {
		Row,
		Section,
		AutoAdjust,
		TopAppBarComponentDev
	} from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import SplitioIcon from '$lib/SplitioIcon.svelte';

	let tabs = [
		{
			icon: 'group',
			label: 'group'
		},
		{
			icon: 'account_circle',
			label: 'you'
		}
	];

	let topAppBar: TopAppBarComponentDev;

	let lightTheme =
		typeof window === 'undefined' || window.matchMedia('(prefers-color-scheme: light)').matches;
	function switchTheme() {
		lightTheme = !lightTheme;
		let themeLink = document.head.querySelector<HTMLLinkElement>('#theme');
		if (!themeLink) {
			themeLink = document.createElement('link');
			themeLink.rel = 'stylesheet';
			themeLink.id = 'theme';
		}
		themeLink.href = `/smui${lightTheme ? '' : '-dark'}.css`;
		document.head
			.querySelector<HTMLLinkElement>('link[href="/smui-dark.css"]')
			?.insertAdjacentElement('afterend', themeLink);
	}
</script>

<TopAppBar bind:this={topAppBar} variant="standard">
	<Row>
		<Section>
				<SplitioIcon isTopApp />
		</Section>
		<Section align="end">
			<IconButton on:click={switchTheme} class="material-icons" aria-label="Information"
				>dark_mode</IconButton
			>
		</Section>
	</Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
	<!-- <div style="display: flex; flex-direction: column; justify-content: space-between;"></div> -->
	<div class="container"><slot /></div>
	<!-- </div> -->
</AutoAdjust>
<!-- 
<div
	style="position: fixed; bottom: 0; width: 100%;background: {lightTheme ? '#f7f7f7' : '#191919'}"
>
	<TabBar {tabs} let:tab bind:active>
		<Tab {tab} stacked>
			<Icon class="material-icons">{tab.icon}</Icon>
			<TabLabel>{tab.label}</TabLabel>
		</Tab>
	</TabBar>
</div> -->
