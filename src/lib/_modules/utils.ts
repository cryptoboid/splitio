import {goto} from '$app/navigation';
import GUN from 'gun';

export function redirectToGroup(groupID : string, secretKey : string) {
    goto('/g/' + groupID + secretKey)
    // window.location.href = base +
}

export function redirectToAbout() {
    goto('/about')
    // window.location.href = base + 'about';
}

export function getMemberAvatarURL(memberName : string, size : number = 40) {
    return `https://source.boringavatars.com/beam/${size}/${
        encodeURIComponent(memberName)
    }?colors=4DAB8C,542638,8F244D,C9306B,E86F9E`;
}

export function getExpenseTimestamp(expenseObject : any) {
    return GUN.state.is(expenseObject, 'amount'); // get the internal timestamp for the amount property.
}

export function absRounded(num : number): string {
    return Math.abs(num).toFixed(2);
}

export function timestampToShortDate(timestamp: number) {
    return ((new Date(timestamp)).toLocaleString('en', { month: 'short', day: 'numeric' })).toLowerCase();
}