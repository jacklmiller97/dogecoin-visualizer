export class DogeBlock {
	constructor(block) {
		this.block = block;
	}

	generateElement(container) {
		const block  = this.block;
		const height = block.size / 100;
		const posY = Math.random()*container.offsetHeight;
		const html = `
			<div id="${block.hash}" class="doge-block" style="width:${height}px; height:${height}px; position: absolute; top:${posY}; right:-10px;"> </div>
		`;
		const nodeElement = new DOMParser().parseFromString(html, 'text/html');

		return nodeElement.querySelector(".doge-block");
	}

	addToDOM(container) {
		const element = this.generateElement(container);
		container.appendChild(element);
	}
}