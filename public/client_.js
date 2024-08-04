const socket = io();

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startButton = document.getElementById('startButton');
const hangupButton = document.getElementById('hangupButton');
const logArea = document.getElementById('logArea');

let localStream;
let remoteStream;
let peerConnection;

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

startButton.onclick = startCall;
hangupButton.onclick = hangup;

function log(message) {
  console.log(message);
  logArea.innerHTML += message + '\n';
  logArea.scrollTop = logArea.scrollHeight;
}

async function startCall() {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;

  peerConnection = new RTCPeerConnection(configuration);
  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  })

  peerConnection.ontrack = event => {
    remoteVideo.srcObject = event.streams[0];
  }

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      socket.emit('ice-candidate', event.candidate);
    }
  }

  peerConnection.oniceconnectionstatechange = () => {
    console.log('ICE connection state changed: ' + peerConnection.iceConnectionState);
  };

  peerConnection.onicegatheringstatechange = () => {
    console.log('ICE gathering state changed: ' + peerConnection.iceGatheringState);
  }

}


socket.on('ready', async () => {
  log('Received ready signal');
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  log('Created offer: ' + JSON.stringify(offer));
  socket.emit('offer', offer);
});

socket.on('offer', async (offer) => {
  log('Received offer: ' + JSON.stringify(offer));
  await peerConnection.setRemoteDescription(offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  log('Created answer: ' + JSON.stringify(answer));
  socket.emit('answer', answer);
});

socket.on('answer', async (answer) => {
  log('Received answer: ' + JSON.stringify(answer));
  await peerConnection.setRemoteDescription(answer);
});

socket.on('ice-candidate', (candidate) => {
  log('Received ICE candidate: ' + JSON.stringify(candidate));
  peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
});

function hangup() {
  log('Ending call');
  if (peerConnection) {
    peerConnection.close();
  }
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
  }
  localVideo.srcObject = null;
  remoteVideo.srcObject = null;
}
