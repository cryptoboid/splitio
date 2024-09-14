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
            'https://splitio-relay.onrender.com/gun',
            'https://gun-manhattan.herokuapp.com/gun',
            'https://peer.wallie.io/gun',
        ],
        localStorage: false
    });
    return GUN.get(STORAGE_PREFIX);
}

export const getSEA = () => {
    return Gun.SEA
};
