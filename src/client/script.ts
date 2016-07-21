declare var easyrtc: any;
let io = require('socket.io-client');

const origin = 'wss://192.168.1.13:8443';
let selfEasyrtcid = '';
let socket = io.connect(origin);

function init() {
    if (easyrtc !== undefined) {
        easyrtc.setSocketUrl(origin);
        easyrtc.enableAudio(false);
        easyrtc.enableAudioReceive(false);
        easyrtc.setRoomOccupantListener(roomListener);
        easyrtc.easyApp('yocortc', 'self', ['caller'],
            connectSuccess,
            failureCallback
        );
    }
}

let connectSuccess = function (easyrtid) {
    selfEasyrtcid = easyrtid;
    console.log('Connect Successful. My id is ' + selfEasyrtcid);
    let room = 'my-room';
    easyrtc.joinRoom(room, null, joinSuccess, failureCallback);
};

let failureCallback = function (errorCode, errorMsg) {
    // log error
    console.log(errorCode);
    console.log(errorMsg);
};

let joinSuccess = function(roomName) { // listen for peers joining the room
    setTimeout(function() {
        console.log('successfully joined room: ' + roomName);
        let peers = easyrtc.getRoomOccupantsAsArray(roomName) || []; // get list of client connected to room
        console.log('peers: ' + peers);
        let peersLength = peers.length;
        if (peersLength > 2) { // support only 1-1 video conferences
            alert('The meeting room is already full. ' +
                'Only the two peers connecting first will be allowed access.');
        } else if (peersLength === 1) { // if no other peer is connected
            console.log('waiting for peer to connect...');
        } else if (peers[0] !== selfEasyrtcid) {// get peer id
            easyrtc.call(peers[0]);
        } else {
            easyrtc.call(peers[1]);
        }
    }, 100);
};

function roomListener (roomName, otherPeers) {
    console.log(roomName, otherPeers);
}