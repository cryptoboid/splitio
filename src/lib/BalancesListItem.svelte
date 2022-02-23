<script lang="ts">
	import { Item, Text, PrimaryText, SecondaryText, Meta, Graphic } from '@smui/list';
	import { absRounded, getMemberAvatarURL } from './_modules/utils';

	export let payerName = '';
	export let amount = 0.0;
	export let isExpanded = false;
	export let onClickCallback = () => {};
</script>

<Item on:click={onClickCallback}>
	<Graphic style="background-image: url({getMemberAvatarURL(payerName)});" />
	<Text>
		<PrimaryText>{payerName}</PrimaryText>
		{#if amount !== 0.0}
			<SecondaryText class={amount < 0 ? 'error-text' : 'success-text'}>
				{amount < 0 ? 'owes' : 'receives'} ${absRounded(amount)}
			</SecondaryText>
		{:else}
			<SecondaryText>
				no debt
			</SecondaryText>
		{/if}
	</Text>
	<Meta class="material-icons">{isExpanded ? 'expand_less' : 'expand_more'}</Meta>
</Item>
