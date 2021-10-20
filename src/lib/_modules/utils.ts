import { base } from '$app/paths';

export function redirectToGroup(groupID:string) {
    window.location.href = base + 'g/'+groupID;
}

export function getMemberAvatarURL(memberName:string, size: number = 40) {
    return `https://source.boringavatars.com/beam/${size}/${memberName}?colors=4DAB8C,542638,8F244D,C9306B,E86F9E`;
}