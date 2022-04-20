import Gun from 'gun';
import 'gun/sea.js';

import 'gun/lib/radix.js';
import 'gun/lib/radisk.js';
import 'gun/lib/store.js';
import 'gun/lib/rindexed.js';

export const initAppDB = () => {
    const GUN = Gun({
        peers: [
            'https://gunmeetingserver.herokuapp.com/gun',
            'https://gun-ams1.maddiex.wtf:443/gun',
            'https://splitio-relay.herokuapp.com/gun',
            'https://splitio-relay-alt.herokuapp.com/gun',
        ],
        localStorage: false
    });
    return GUN.get('splitio');
}

export const getSEA = () => {
    return Gun.SEA
};