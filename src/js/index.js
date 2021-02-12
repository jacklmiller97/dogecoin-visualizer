import { DogeBlock } from "./DogeBlock";
import "../css/reset.css";
import "../css/style.css";

const HOST = `wss://ws.dogechain.info/inv`;
const ws   = new WebSocket(HOST);
const app  = document.getElementById('app');

let playAudio = false;

// Connection opened
ws.addEventListener('open', function (event) {
    ws.send('{"op":"blocks_sub"}');
});

// Listen for messages
ws.addEventListener('message', function (event) {
    const dogeBlockData = JSON.parse(event.data);

    if (dogeBlockData.op !== "block") {
        return;
    }

    const dogeBlock = new DogeBlock(dogeBlockData.x, playAudio);

    dogeBlock.addToDOM(app);
});

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