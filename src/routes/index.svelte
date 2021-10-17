<script lang="ts">
	import {onMount} from 'svelte';
	import Fab, { Icon as FabIcon } from '@smui/fab';
	import List, { Item, Text, PrimaryText, SecondaryText, Meta, Graphic } from '@smui/list';
	import Gun from 'gun';
	
	onMount(() => {
		// // import 'gun/sea';
	
		const GUN = Gun({
			peers: [
				// Community relay peers: https://github.com/amark/gun/wiki/volunteer.dht
				'https://gunmeetingserver.herokuapp.com/gun',
				'https://gun-us.herokuapp.com/gun',
				'https://gun-ams1.maddiex.wtf:443/gun',
				'https://gun-sjc1.maddiex.wtf:443/gun',
				// 'https://gun-eu.herokuapp.com/gun'
				// My own relay peer
				// "http://192.168.0.10:8765/gun"
			]
		});
		const GROUPID = new URLSearchParams(window.location.search).get('group') || 'testing123';
		const db = GUN.get('splitio');
		const groupDB = db.get(GROUPID);
		groupDB
			.get('expenses')
			.map()
			.on(async function (expense, key) {
				if (expense && typeof expense === 'object') {
					// Updates the store with the new value
					store[key] = expense;
					store[key].gunID = key;
				} else {
					// A key may contain a null value (if data has been deleted/set to null)
					// if so, we remove the item from the store
					delete store[key];
					store = store;
				}
			});
	})

	let store = {};
	$: expenses = Object.entries(store);
	
</script>

<br><br><br>
<div class="mdc-typography--headline4">Awesome ski trip</div>
<br>
<div class="mdc-typography--headline5">💸 group expenses</div>

<List twoLine>
	{#each expenses as [key, expense]}
		<Item>
			<Text>
				<PrimaryText>{expense.title}</PrimaryText>
				<SecondaryText>${expense.amount} by {expense.paidBy}</SecondaryText>
			</Text>
			<Meta class="material-icons">info</Meta>
		</Item>
	{/each}
	<Item>
		<Text>
			<PrimaryText>sandwiches x4</PrimaryText>
			<SecondaryText>$34.5 by frank</SecondaryText>
		</Text>
		<Meta class="material-icons">info</Meta>
	</Item>
	<Item>
		<Text>
			<PrimaryText>water jugs</PrimaryText>
			<SecondaryText>$23 by thomas</SecondaryText>
		</Text>
		<Meta class="material-icons">info</Meta>
	</Item>
	<Item>
		<Text>
			<PrimaryText>tickets</PrimaryText>
			<SecondaryText>$120 by charles</SecondaryText>
		</Text>
		<Meta class="material-icons">info</Meta>
	</Item>
</List>

<div class="mdc-typography--headline5">🤝 members</div>

<List oneLine avatarList>
	<Item>
		<Graphic
          style="background-image: url(https://place-hold.it/40x40?text=CH&fontsize=16);"
        />
		<Text>
			charles
		</Text>
		<Meta class="material-icons">clear</Meta>
	</Item>
	<Item>
		<Graphic
          style="background-image: url(https://place-hold.it/40x40?text=CH&fontsize=16);"
        />
		<Text>
			charles
		</Text>
		<Meta class="material-icons">clear</Meta>
	</Item>
	<Item>
		<Graphic
          style="background-image: url(https://place-hold.it/40x40?text=CH&fontsize=16);"
        />
		<Text>
			charles
		</Text>
		<Meta class="material-icons">clear</Meta>
	</Item>
	<Item>
		<Graphic
          style="background-image: url(https://place-hold.it/40x40?text=CH&fontsize=16);"
        />
		<Text>
			charles
		</Text>
		<Meta class="material-icons">clear</Meta>
	</Item>
	<Item>
		<Graphic
          style="background-image: url(https://place-hold.it/40x40?text=CH&fontsize=16);"
        />
		<Text>
			charles
		</Text>
		<Meta class="material-icons">clear</Meta>
	</Item>
	<Item>
		<Graphic
          style="background-image: url(https://place-hold.it/40x40?text=CH&fontsize=16);"
        />
		<Text>
			charles
		</Text>
		<Meta class="material-icons">clear</Meta>
	</Item>
	<Item>
		<Graphic
          style="background-image: url(https://place-hold.it/40x40?text=CH&fontsize=16);"
        />
		<Text>
			charles
		</Text>
		<Meta class="material-icons">clear</Meta>
	</Item>
	<Item>
		<Graphic
          style="background-image: url(https://place-hold.it/40x40?text=CH&fontsize=16);"
        />
		<Text>
			charles
		</Text>
		<Meta class="material-icons">clear</Meta>
	</Item>
	<Item>
		<Graphic
          style="background-image: url(https://place-hold.it/40x40?text=CH&fontsize=16);"
        />
		<Text>
			charles
		</Text>
		<Meta class="material-icons">clear</Meta>
	</Item>
	<Item>
		<Graphic
          style="background-image: url(https://place-hold.it/40x40?text=CH&fontsize=16);"
        />
		<Text>
			charles
		</Text>
		<Meta class="material-icons">clear</Meta>
	</Item>
	<Item>
		<Graphic
          style="background-image: url(https://place-hold.it/40x40?text=CH&fontsize=16);"
        />
		<Text>
			charles
		</Text>
		<Meta class="material-icons">clear</Meta>
	</Item>
	<Item>
		<Graphic
          style="background-image: url(https://place-hold.it/40x40?text=CH&fontsize=16);"
        />
		<Text>
			charles
		</Text>
		<Meta class="material-icons">clear</Meta>
	</Item>
	<Item>
		<Graphic
          style="background-image: url(https://place-hold.it/40x40?text=CH&fontsize=16);"
        />
		<Text>
			charles
		</Text>
		<Meta class="material-icons">clear</Meta>
	</Item>
</List>

<!-- <Button on:mousedown={handleClick} style="border-radius: 0px;">
	<Icon class="material-icons">thumb_up</Icon>
	<Label>Click Me</Label>
</Button>
<p class="mdc-typography--body1">
	{#if clicked}
		You've clicked the button {clicked} time{clicked === 1 ? '' : 's'}. Middle click the button to
		reset.
	{:else}
		<span class="grayed">You haven't clicked the button.</span>
	{/if}
</p> -->

<div class="flexy">
	<div class="margins">
		<Fab style="border-radius: 17px;">
			<FabIcon class="material-icons">add</FabIcon>
		</Fab>
	</div>
</div>

<style>

	.flexy {
		/* display: flex;
		flex-wrap: wrap;
		align-items: center; */
		position: fixed;
		bottom: 82px;
		right: 10px;
		z-index: 1;
	}
	* :global(.margins) {
		margin: 0 0.4em 0.4em 0;
	}
</style>
