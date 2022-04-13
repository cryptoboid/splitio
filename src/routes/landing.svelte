<script>
import { goto } from '$app/navigation';

	import Button, {Label, Icon} from '@smui/button';
	import { Parallax, ParallaxLayer } from 'svelte-parallax';

	const REPEAT = 50;
	const EMOJIS = ['😀', '✨', '🔥', '❤️'];
    let parallax;

</script>

<Parallax bind:this={parallax}  sections={2} config={{ stiffness: 1, damping: 1 }} threshold={{ top: 0, bottom: 0 }}>
	<ParallaxLayer rate={0} span={2} style={'background-color: #2af38f;'} />

	<ParallaxLayer rate={-0.5} offset={0}>
		<img
			height="100%"
			src="https://svelte.dev/_app/assets/svelte-machine-e77a67d2.avif"
			alt="a horse"
		/>
	</ParallaxLayer>

	{#each Array(REPEAT) as _, i}
		<ParallaxLayer rate={-0.25 + Math.random() * 0.5} offset={Math.random()}>
			<div style={'margin-left: ' + Math.random() * 100 + 'vw; font-size: 2rem'}>
				{EMOJIS[Math.floor(EMOJIS.length * Math.random())]}
			</div>
		</ParallaxLayer>
	{/each}

	<ParallaxLayer rate={1} offset={0.35}>
		<div style="border-radius: 17px;" class="center">
			<img on:click={() => parallax.scrollTo(2, {selector: '.bot-btn', duration: 1000})} src="./logo_black.png" height="200vh" alt="icon" />
		</div>
	</ParallaxLayer>

	<ParallaxLayer rate={0.000005} offset={1} style={'background-color: #e22850;'} />

	<ParallaxLayer rate={-0.25} offset={1.5}>
		<div class="center">
			<Button
                class="bot-btn"
				style="border-radius: 17px; margin: 1rem"
				variant="raised"
				color="primary"
				on:click={() => {
					goto('/')
				}}
			>
            <Label>let's go!</Label>
            <Icon class="material-icons">forward</Icon>
			</Button>
		</div>
	</ParallaxLayer>
</Parallax>

<style>
	.center {
		align-items: center;
		justify-items: center;
		display: flex;
		flex-direction: column;
	}
</style>
