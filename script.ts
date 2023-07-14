/**
 * Color enum
 */
enum Color {
	RED = "bg-red-900",
	BLUE = "bg-sky-700",
	GREEN = "bg-green-700",
	YELLOW = "bg-yellow-400",
	ORANGE = "bg-yellow-900",
}

/**
 * Dot class
 * @param color Color
 * @param index number
 * @returns Dot
 */
class Dot {
	public color: Color;
	public index: number;

	constructor(color: Color, index: number = 0) {
		this.color = color;
		this.index = index;
	}
}

class Wall {
	dots: Dot[] = [];
	wrapperElement: HTMLElement;
	count: number;

	constructor() {
		this.count = 231;
		this.wrapperElement = document.getElementById("wrapper") as HTMLElement;
		this.generateDots();
	}

	generateDots() {
		for (let i = 0; i < this.count; i++) {
			const dot = new Dot(
				Object.values(Color)[Math.floor(Math.random() * 5)],
				i
			);

			const aboveDot = this.getDotAbove(dot);
			const belowDot = this.getDotBelow(dot);
			const leftDot = this.getDotLeft(dot);
			const rightDot = this.getDotRight(dot);

			if (
				(aboveDot && aboveDot.color === dot.color) ||
				(belowDot && belowDot.color === dot.color) ||
				(leftDot && leftDot.color === dot.color) ||
				(rightDot && rightDot.color === dot.color)
			) {
				i--;
				continue;
			}

			this.dots.push(dot);
			this.generateDot(dot, this.wrapperElement);
		}
	}
	getDotRight(dot: Dot) {
		const currentRow = Math.floor(dot.index / 11);
		const currentColumn = dot.index % 11;

		const rightRow = currentRow;
		const rightColumn = currentColumn + 1;

		if (rightColumn >= 11) {
			return null;
		}

		const rightIndex = rightRow * 11 + rightColumn;

		if (rightIndex >= this.count) {
			return null;
		}

		return this.dots[rightIndex];
	}

	getDotLeft(dot: Dot) {
		const currentRow = Math.floor(dot.index / 11);
		const currentColumn = dot.index % 11;

		const leftRow = currentRow;
		const leftColumn = currentColumn - 1;

		if (leftColumn < 0) {
			return null;
		}

		const leftIndex = leftRow * 11 + leftColumn;

		if (leftIndex < 0) {
			return null;
		}

		return this.dots[leftIndex];
	}

	getDotAbove(dot: Dot) {
		const currentRow = Math.floor(dot.index / 11);

		const currentColumn = dot.index % 11;

		const aboveRow = currentRow - 1;
		const aboveColumn = currentColumn;

		if (aboveRow < 0) {
			return null;
		}

		const aboveIndex = aboveRow * 11 + aboveColumn;

		if (aboveIndex < 0) {
			return null;
		}

		return this.dots[aboveIndex];
	}

	getDotBelow(dot: Dot) {
		const currentRow = Math.floor(dot.index / 11);
		const currentColumn = dot.index % 11;

		const belowRow = currentRow + 1;
		const belowColumn = currentColumn;

		const belowIndex = belowRow * 11 + belowColumn;

		if (belowIndex >= this.count) {
			return null;
		}

		return this.dots[belowIndex];
	}

	generateDot(dot: Dot, wrapper: HTMLElement) {
		const dotElement = document.createElement("div");
		dotElement.classList.add("aspect-square");
		dotElement.classList.add("w-full");
		dotElement.classList.add("rounded-sm");
		dotElement.classList.add("cursor-pointer");
		dotElement.classList.add("hover:scale-90");

		dotElement.classList.add(dot.color);
		dotElement.onclick = () => {
			dotElement.classList.remove(dot.color);
			dot.color = Object.values(Color)[Math.floor(Math.random() * 5)];
			dotElement.classList.add(dot.color);
		};
		wrapper.appendChild(dotElement);
	}
}

const wall = new Wall();
