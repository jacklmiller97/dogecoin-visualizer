export class DogeBlock {
	constructor(block) {
		this.block    = block;
		this.duration = 15000
	}

	generateElement(container) {
		const block = this.block;

		let height = 80*(this.block.size/100000);
		height = height <= 100 ? height : 100;
		height = height >= 10 ? height : 10;

		const posY = Math.random()*(100 - height);

		const html = `
			<div id="${block.hash}" class="doge-block" style="width:${height}vh; height:${height}vh; position: absolute; top:${posY}vh; right:-10px; animation-duration:${this.duration/1000}s;">
				<div>${block.size/1000}KB</div>
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