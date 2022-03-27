<script lang="ts">
	import CircularProgress from '@smui/circular-progress/CircularProgress.svelte';
	export let showOverlay = false;
</script>

<!-- Loading overlay -->
<div class="black-overlay" hidden={!showOverlay}>
	<div class="fixed-center">
		<CircularProgress
			style="height: 100px; width: 100px;"
			indeterminate
			class="create-group-loading"
		/>
	</div>
</div>

<style>
	.fixed-center {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.black-overlay {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		top: 0;
	}
</style>
