export class DogeBlock {
	constructor(block) {
		this.block    = block;
		this.duration = 15000
	}

	generateElement(container) {
		const block  = this.block;
		const words  = ['much','very','many','such','so'];
		const colors = ['#dd00cc','#ff3333','#22ee22','#3333ff','#ff8800'];

		let height = 80*(this.block.size/100000);
		height = height <= 100 ? height : 100;
		height = height >= 20 ? height : 20;

		const posY = Math.random()*(100 - height);
		const cols = {
			"size"       : block.size,
			"height"     : block.height,
			"difficulty" : block.difficulty,
		};

		let elements = "";

		// This is for the text we include in the image (size, tx count, etc)
		for (let key in cols) {
			let top  = (Math.random() * 75) + 5;
			let left = (Math.random() * 75) + 5;
			let word = words[Math.floor(Math.random()*words.length)];
			let color = colors[Math.floor(Math.random()*colors.length)];
			let data;

			if (key === "size") {
				data = `big ${cols[key]/1000}KB`;
			}
			else if (key === "height") {
				data = `tall ${cols[key]}`;
			}
			else if (key === "difficulty") {
				data = `hard ${cols[key]}`;
			}

			elements += `<div style="position:absolute; top:${top}%; left:${left}%; color:${color}">${word} ${data}</div>`;
		}

		const html = `
			<div id="${block.hash}" class="doge-block" style="width:${height}vh; height:${height}vh; position: absolute; top:${posY}vh; right:-10px; animation-duration:${this.duration/1000}s;">
				${elements}
			</div>
		`;
		const nodeElement = new DOMParser().parseFromString(html, 'text/html');

		return nodeElement.querySelector(".doge-block");
	}

	addToDOM(container) {
		const element = this.generateElement(container);
		container.appendChild(element);

		setTimeout(() => {
			element.remove();
		}, this.duration);
	}
}