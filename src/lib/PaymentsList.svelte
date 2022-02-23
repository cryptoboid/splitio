<script lang="ts">
	import List, { Item, Text, PrimaryText, SecondaryText, Graphic } from '@smui/list';
	import { absRounded, getMemberAvatarURL } from './_modules/utils';
	export let pendingPayments: Array<any> = [];
	export let payerName = '';
	export let showRecordPaymentCallback: Function;
</script>

<List twoLine style="margin-left: 30px; margin-bottom: 10px;">
	{#if pendingPayments.length === 0}
		<Item disabled>
			<Text>
				<PrimaryText>no pending debts!</PrimaryText>
				<SecondaryText>check others for payments...</SecondaryText>
			</Text>
		</Item>
	{:else}
		{#each pendingPayments as [receiverName, debtAmount]}
			<Item on:click={() => showRecordPaymentCallback(receiverName, debtAmount, payerName)}>
				<Text>
					<PrimaryText><span style="color: gray">pay to</span> {receiverName}</PrimaryText>
					<SecondaryText class="error-text">${absRounded(debtAmount)}</SecondaryText>
				</Text>
				<Graphic
					style="margin-left: auto; margin-right: 0; background-image: url({getMemberAvatarURL(
						receiverName
					)});"
				/>
			</Item>
		{/each}
	{/if}
</List>
