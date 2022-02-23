import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const secretKey = writable('');
export const groupDB: Writable<any> = writable(undefined);
export const groupStore = writable({ expenses: {}, payments: {}, members: {}, groupInfo: { name: 'loading...' } });
