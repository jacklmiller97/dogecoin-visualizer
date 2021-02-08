import { DogeBlock } from "./DogeBlock";
import "../css/reset.css";
import "../css/style.css";

const HOST = `wss://ws.dogechain.info/inv`;
const ws   = new WebSocket(HOST);
const app  = document.getElementById('app');

// Connection opened
ws.addEventListener('open', function (event) {
    ws.send('{"op":"blocks_sub"}');
});

// Listen for messages
ws.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);

    const dogeBlockData = JSON.parse(event.data);

    if (dogeBlockData.op !== "block") {
        return;
    }

    const dogeBlock = new DogeBlock(dogeBlockData.x);

    dogeBlock.addToDOM(app);
});