import Gun from 'gun';
import 'gun/sea';

// console.log(Gun.SEA.encrypt('xdd', '#password'), Gun.SEA.pair());

export const initAppDB = () => {
    const GUN = Gun({
        peers: [
            // Community relay peers: https://github.com/amark/gun/wiki/volunteer.dht
            'https://gunmeetingserver.herokuapp.com/gun',
            // 'https://gun-us.herokuapp.com/gun',
            'https://gun-ams1.maddiex.wtf:443/gun',
            'https://gun-sjc1.maddiex.wtf:443/gun',
            // 'https://gun-eu.herokuapp.com/gun'
            // My own relay peer
            // "http://192.168.0.10:8765/gun"
        ]

    });
    return GUN.get('splitio');
}

export const getSEA = () => {
    return Gun.SEA
};