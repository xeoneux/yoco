const origin = "https://192.168.1.13:8443";
let io = require("socket.io-client");
let easyrtc = require("easyrtc");

let selfEasyrtcid = "";
let socket = io.connect(origin);

function my_init() {
    easyrtc.setRoomOccupantListener(roomListener);
    easyrtc.easyApp("UrgeTest", "self", ["caller"],
        function(myId) {
            console.log("My easyrtcid is " + myId);
        }
    );
}

function roomListener (roomName, otherPeers) {

}