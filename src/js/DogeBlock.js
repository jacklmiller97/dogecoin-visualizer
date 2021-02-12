import shibaBark1 from "../audio/shiba_bark_1.ogg";
import shibaBark2 from "../audio/shiba_bark_2.ogg";
import shibaBark3 from "../audio/shiba_bark_3.ogg";
import shibaBark4 from "../audio/shiba_bark_4.ogg";
import shibaBark5 from "../audio/shiba_bark_5.ogg";
import shibaBark6 from "../audio/shiba_bark_6.ogg";

export class DogeBlock {
	constructor(block, playAudio) {
		this.block     = block;
		this.duration  = 15000;
		this.playAudio = playAudio;
	}

	generateElement() {
		const block     = this.block;
		const words     = ['much','very','many','such','wow so'];
		const colors    = ['#dd00cc','#ff3333','#22ee22','#3333ff','#ff8800'];
		const fontSizes = ["1.25rem", "1.5rem", "1.75rem"];

		let height = 70*(this.block.size/100000);
		height = height <= 100 ? height : 100;
		height = height >= 20 ? height : 20;

		const posY = Math.random()*(100 - height);
		const cols = {
			"size"   : block.size,
			"height" : block.height,
			"wow"    : "wow!",
		};
		const colsKeys = Object.keys(cols);

		let elements = "";

		// This is for the text we include in the image (size, tx count, etc)
		for (let key in cols) {
			// Okay so this is a little stupid, but we split the area of the block into however many cols we have
			// then pick a random number between the min and max for those parameters. So they never overlap.
			let max = 100*((colsKeys.indexOf(key)+1)/colsKeys.length)-10;
			let min = 100*((colsKeys.indexOf(key))/colsKeys.length);
			let top = Math.random()*(max - min + 1) + min;

			let left     = Math.random()*(75 - 10 + 1) + 10;
			let word     = words[Math.floor(Math.random()*words.length)];
			let color    = colors[Math.floor(Math.random()*colors.length)];
			let fontSize = fontSizes[Math.floor(Math.random()*fontSizes.length)];
			let data;

			if (key === "size") {
				data = `${word} big ${cols[key]/1000}KB`;
			}
			else if (key === "height") {
				data = `${word} tall ${cols[key]}`;
			}
			else if (key === "difficulty") {
				data = `${word} hard ${cols[key]}`;
			}
			else if (key === "wow") {
				data = `wow`;
			}

			elements += `<div style="position:absolute; top:${top}%; left:${left}%; color:${color}; font-size:${fontSize};">${data}</div>`;
		}

		const html = `
			<div id="${block.hash}" class="doge-block" style="width:${height}vh; height:${height}vh; position: absolute; top:${posY}vh; right:-10px; animation-duration:${this.duration/1000}s;">
				${elements}
			</div>
		`;
		const nodeElement = new DOMParser().parseFromString(html, 'text/html');

		return nodeElement.querySelector(".doge-block");
	}

	bark() {
		const audio_files = [
			shibaBark1,
			shibaBark2,
			shibaBark3,
			shibaBark4,
			shibaBark5,
			shibaBark6,
		];
		const random_file = Math.floor(Math.random()*audio_files.length);
		const audio       = new Audio(audio_files[random_file]);

		audio.play();
	}

	addToDOM(container) {
		const element = this.generateElement(container);
		container.appendChild(element);

		if (this.playAudio) {
			let timesToBark = 0;
			let intervalID = setInterval(() => {
				this.bark();

				if (++timesToBark >= Math.ceil(Math.random()*2)) {
					window.clearInterval(intervalID);
				}
			}, 250);
		}

		setTimeout(() => {
			element.remove();
		}, this.duration);
	}
}