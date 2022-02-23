import Gun from 'gun';
import type { IGunChainReference } from 'gun/types/chain';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const secretKey = writable('');
export const groupDB: Writable<IGunChainReference> = writable(Gun().get(''));
export const groupStore = writable({ expenses: {}, payments: {}, members: {}, groupInfo: { name: 'loading...' } });
