
$(document).ready(function() { //wait for DOM to be ready for JS execution
    easyrtc.enableDebug(true);
    easyrtc.setVideoDims(640, 480);
    easyrtc.enableAudio(false);
  	easyrtc.enableAudioReceive(false);
  	easyrtc.setRoomOccupantListener(roomListener);
    easyrtc.easyApp('yocortc', 'self', ['peer'], connectSuccess, failureCallback); //connect to easyrtc app; initiate media sources and elements
});

var myEasyrtcId; //id of client in the signaling framework
var connectSuccess = function(easyrtcid) { //join room as defined by "room" parameter in URL
	myEasyrtcId = easyrtcid;
	var room  = "my-room"
	console.log('join room: ' + room);
	console.log('my-id:'+ myEasyrtcId);
	easyrtc.joinRoom(room, null, joinSuccess, failureCallback);
};

var failureCallback = function(errorCode, errorMsg) { //log error
    console.log(errorCode);
    console.log(errorMsg);
};

var joinSuccess = function(roomName) { //listen for peers joining the room
        setTimeout(function() {
            console.log('successfully joined room: ' + roomName);
            var peers = easyrtc.getRoomOccupantsAsArray(roomName) || []; //get list of client connected to room
            console.log('peers: ' + peers);
            var peersLength = peers.length;
            if (peersLength > 2) { //support only 1-1 video conferences
                alert('The meeting room is already full. ' +
                    'Only the two peers connecting first will be allowed access.');
            } else if(peersLength === 1) { //if no other peer is connected
                console.log('waiting for peer to connect...');
            } else if(peers[0] != myEasyrtcId) {//get peer id
                easyrtc.call(peers[0]);
            } else {
                easyrtc.call(peers[1]);
            }
        }, 100);
    };

function roomListener(roomName, otherPeers) {
	console.log(roomName);
	console.log(otherPeers);
}