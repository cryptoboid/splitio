import { base } from '$app/paths';
import GUN from 'gun';

export function redirectToGroup(groupID:string) {
    window.location.href = base + 'g/'+groupID;
}

export function getMemberAvatarURL(memberName:string, size: number = 40) {
    return `https://source.boringavatars.com/beam/${size}/${encodeURIComponent(memberName)}?colors=4DAB8C,542638,8F244D,C9306B,E86F9E`;
}

export function getExpenseTimestamp(expenseObject: any) {
    return GUN.state.is(expenseObject, 'amount'); // get the internal timestamp for the amount property.
}