import { DogeBlock } from "./DogeBlock";
import "../css/reset.css";
import "../css/style.css";

const HOST = `wss://ws.dogechain.info/inv`;
const app  = document.getElementById('app');

// This will inform DogeBlock about whether to bark or not.
let playAudio = false;

function connect() {
	let ws = new WebSocket(HOST);

	// Connection opened
	ws.addEventListener('open', (e) => {
		ws.send('{"op":"blocks_sub"}');
	});

	// If the connection closes for whatever reason, reopen it.
	ws.addEventListener('close', (e) => {
		console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
		setTimeout(() => {
			connect();
		}, 1000);
	});

	// Listen for messages
	ws.addEventListener('message', (e) => {
		const dogeBlockData = JSON.parse(e.data);

		if (dogeBlockData.op !== "block") {
			return;
		}

		const dogeBlock = new DogeBlock(dogeBlockData.x, playAudio);

		dogeBlock.addToDOM(app);
	});
}

// Init WebSocket.
connect();

// Listen for clicks to the audio controls.
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('mute')) {
		document.querySelectorAll('audio').forEach((audio) => {
			audio.volume = 1;
		});

		e.target.classList.add("hidden");
		document.querySelector('.unmute').classList.remove('hidden');
		playAudio = true;
	}
	else if (e.target.classList.contains('unmute')) {
		document.querySelectorAll('audio').forEach((audio) => {
			audio.volume = 0;
		});

		e.target.classList.add("hidden");
		document.querySelector('.mute').classList.remove('hidden');
		playAudio = false;
	}
});