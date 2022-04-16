<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		return {
			props: {
				groupId: page.params.groupid
			}
		};
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { initAppDB } from '$lib/_modules/initGun';
	import { onSecure } from '$lib/_modules/secure';
	import { secretKey, groupDB, groupStore } from '$lib/_modules/stores';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';

	export let groupId: string;

	let localStorageInfo = { msg: 'error loading info or nothing found by inspector' };
	let idxDBInfo = { msg: 'error loading info or nothing found by inspector' };
	let localDB = null;
	let disableConnectGunBtn = false;

	function displayData() {
		// Open our object store and then get a cursor list of all the different data items in the IDB to iterate through
		let objectStore = localDB.transaction('radata').objectStore('radata');
		objectStore.openCursor().onsuccess = function (event) {
			let cursor = event.target.result;
			// if there is still another cursor to go, keep runing this code
			if (cursor) {
				if (cursor.key === '!') idxDBInfo = JSON.parse(cursor.value);
				cursor.continue();
			}
		};
	}

	onMount(() => {
		let lsValue = localStorage.getItem('gun/');
		if (lsValue !== null) localStorageInfo = JSON.parse(lsValue);

		var DBOpenRequest = window.indexedDB.open('radata', 1);
		DBOpenRequest.onerror = function (event) {
			console.error('Error loading database.');
		};
		DBOpenRequest.onsuccess = function (event) {
			console.info('Database initialized.');
			localDB = DBOpenRequest.result;
			console.log(localDB);
			displayData();
		};

		$secretKey = window.location.hash;
	});

	const connectGunToGroup = () => {
		const appDB = initAppDB();
		$groupDB = appDB.get(groupId);

		onSecure(
			$groupDB.get('expenses').map(),
			$secretKey,
			(plain, key) => ($groupStore.expenses[key] = plain),
			(key) => {
				delete $groupStore.expenses[key];
				$groupStore.expenses = $groupStore.expenses;
			}
		);

		onSecure(
			$groupDB.get('members').map(),
			$secretKey,
			(plain, key) => ($groupStore.members[plain.name] = plain),
			(key) => {
				delete $groupStore.members[key];
				$groupStore.members = $groupStore.members;
			}
		);

		onSecure(
			$groupDB.get('groupInfo'),
			$secretKey,
			(plain, key) => {
				$groupStore.groupInfo.name = plain.name;
			},
			(key) => {
				delete $groupStore.groupInfo[key];
				$groupStore.groupInfo = $groupStore.groupInfo;
			}
		);

		onSecure(
			$groupDB.get('payments').map(),
			$secretKey,
			(plain, key) => ($groupStore.payments[key] = plain),
			(key) => {
				delete $groupStore.payments[key];
				$groupStore.payments = $groupStore.payments;
			}
		);
	};
</script>

<svelte:head>
	<title>splitio | inspector</title>
</svelte:head>

<div class="mdc-typography--headline5">group inspector</div>
<div class="mdc-typography--body1">use this utility to inspect your group's local copy.</div>
<div class="mdc-typography--body1">keep in mind that the localStorage and indexedDB views are snapshots on first load. if you connect to Gun, you may need to refresh the page to update the info</div>

<div class="mdc-typography--headline5">view from localStorage</div>

<Textfield
	style="width: 100%; height: 500px; margin: 0.5rem 0rem"
	helperLine$style="width: 100%;"
	textarea
	value={JSON.stringify(localStorageInfo, null, 2)}
/>

<div class="mdc-typography--headline5">view from indexedDB</div>

<Textfield
	style="width: 100%; height: 500px; margin: 0.5rem 0rem"
	helperLine$style="width: 100%;"
	textarea
	value={JSON.stringify(idxDBInfo, null, 2)}
/>

<div class="mdc-typography--headline5">
	view from GunDB
	<Button
		disabled={disableConnectGunBtn}
		on:click={() => {
			disableConnectGunBtn = true;
			connectGunToGroup();
		}}
		variant="unelevated"
	>
		<Label>connect gun</Label>
	</Button>
</div>

<Textfield
	style="width: 100%; height: 500px; margin: 0.5rem 0rem"
	helperLine$style="width: 100%;"
	textarea
	value={JSON.stringify($groupStore, null, 2)}
/>
