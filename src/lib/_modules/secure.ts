import {getSEA} from "./initGun";

const SEA = getSEA();

export async function putSecure(node, payload : any, secretKey : string, callback) {
    let secretPayload = await SEA.encrypt(payload, secretKey);
    node.put(secretPayload, callback);
}

export async function onSecure(node, secretKey : string, callback, emptyCallback) {
    node.on(async (data, key) => {
        if (data) {
            let plain = await handleDecrypt(data, secretKey);
            callback(plain, key);
        } else {
            emptyCallback(key);
        }
    })
}

async function handleDecrypt(payload, secretKey) {
    let res = undefined;
    res = await SEA.decrypt(payload, secretKey);
    if (! res) {
        console.error("Error decrypting payload, assuming no key...");
        res = payload;
    }
    return res;
}

export async function setSecure(node, payload : any, secretKey : string) {
    let secretPayload = await SEA.encrypt(payload, secretKey);
    node.set(secretPayload);
}
