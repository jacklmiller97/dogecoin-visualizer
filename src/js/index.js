import { DogeBlock } from "./DogeBlock";
import axios from "axios";
import "../css/reset.css";
import "../css/style.css";

const HOST = `wss://ws.dogechain.info/inv`;
const ws   = new WebSocket(HOST);
const app  = document.getElementById('app');

// TODO: Remove test block before release.
const testBlock = {
	"nonce": 0,
	"merkleroot": "ebbc737fc3eb22512c09d8916d3bdee2b1056e191c860743f0aa457879ad5b7a",
	"hash": "ebdd659c45a66f1972c9b6fcdadaa3e48bc5fe20b6b7dd5afbf78131df6045ad",
	"height": 3600083,
	"difficulty": 4509194.16717931,
	"txs": [
		"98743d2d4e7f1b649f1ff81c05106aee5830ad1fc3d4ec63527de70064f332de",
		"6d11000f17054abda81b7bac26bca7edcbb4571e4d993fcf45590df5a8356e43",
		"62e0b5c4c5edc250ef2b2596796568e3c1188ac658a1aea7291559bfc55ebaac",
		"481956cb408d36cccddd3359ae388f9359aeed2b2ce7ba0296be040dade10914",
		"ff6ed1f8ed895932cf33006f287debec3f269f52366b0dc3e5b7c9eced560562",
		"2187339dd8805b569a63730d313007b9af1b9d2319dd052f97dc3493ada4c1ac",
		"93b8c9140a9eab9cbeedab10b7020364b99b749e4c6b911d692ad1cded3dcc74",
		"3a8e8ba7ad8c1c786671ccf32c268be700bc2cfed8f05313b049ae2af79bc25d",
		"24e7a0cfd02d8179c8264f6a3f60bc6e0fc0ff2a4033e9dd908589410fb1f8cb",
		"bbcea717c7724395a1817a252b0195c904acc62c39d3869a3739b11ddb9d4391",
		"755265d848f40fc5d47c2550e2ef449736b85aea04d0875a3fa7ab35122b7596",
		"192335fa69d34145c245a50f81229575436932f31ec3205947be20099d6a3d64",
		"0ee972c34259ce1ed0f824f504b649472b7958ab5e78d9137ad66d4a9cb9f85a",
		"0e225e23960ffb53a87f0111c689c0ddfaca28fea04e0b2d33b472db056a1bdc",
		"cbab16daf05449c8bdd5b50effb39922a0818ba45bf043b50ad857a22b9359c3",
		"f9fd72877d32eeb895de573ec313212f08bf8bd7fcd5064578557468c18bbbda",
		"c3c02aeb379753e238a457d577c57f1861abfe096a54bc38cbdc39d9d10e156b",
		"6a6b95fb658080ad6b1e79b493a84a4e9044298ff0cf1745e7c43c465cf0f858",
		"d1f85da44b30ee81a6a5ee36853ec9da81367d0d5735eed08a46176177460351",
		"ceece34e14ee8d15723e1e640052e897b150eb5a8d4228f1f160b5dd3df17e15",
		"58bc99b89051bed167d13594175cbd8cea0ca9caf016242c82a445dbc271de3e",
		"ec65086dfeab6a536225c7f15c8d6aeda6335911f08ebe9e4df19d59046a4db7"
	],
	"n_tx": 22,
	"size": 120586,
	"miner": "DMr3fEiV...",
	"version": 6422788,
	"time": 1612837683,
	"reward": 1006240135094,
	"bits": "1a03b87a"
}

const testDogeBlock = new DogeBlock(testBlock);
testDogeBlock.addToDOM(app);

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