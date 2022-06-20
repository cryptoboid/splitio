import type { IGunChainReference } from 'gun/types/chain';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { PLACEHOLDER_GROUP_NAME } from './constants';

export const secretKey = writable('');
export const groupDB: Writable<IGunChainReference | undefined> = writable(undefined);
export const groupStore = writable({ expenses: {}, payments: {}, members: {}, groupInfo: { name: PLACEHOLDER_GROUP_NAME }, groupNotes: '' });
export function resetGroupStore() {
    groupStore.set({ expenses: {}, payments: {}, members: {}, groupInfo: { name: PLACEHOLDER_GROUP_NAME }, groupNotes: '' });
}
