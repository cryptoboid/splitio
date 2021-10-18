import { base } from '$app/paths';

export function redirectToGroup(groupID:string) {
    window.location.href = base + 'g/'+groupID;
}
