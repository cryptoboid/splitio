import Gun from 'gun';
import 'gun/sea.js';

import 'gun/lib/radix.js';
import 'gun/lib/radisk.js';
import 'gun/lib/store.js';
import 'gun/lib/rindexed.js';

import { STORAGE_PREFIX } from './constants';

export const initAppDB = () => {
    const GUN = Gun({
        peers: [
            'https://splitio-relay.herokuapp.com/gun',
            'https://splitio-relay-alt.herokuapp.com/gun',
            'https://splitio-relay-cryptoboid.cloud.okteto.net/gun',
            'https://splitio-relay.up.railway.app/gun',
            'https://splitio-relay.onrender.com/gun',
        ],
        localStorage: false
    });
    return GUN.get(STORAGE_PREFIX);
}

export const getSEA = () => {
    return Gun.SEA
};
