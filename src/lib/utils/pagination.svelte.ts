interface PaginationProps {
	count: number;
	limit?: number;
	start?: number;
	root?: HTMLElement;
}

export class Pagination {
	#root: HTMLElement | undefined = $state();
	#count = $state(10);
	#limit = $state(10);
	#page = $state(1);
	#totalPage = $derived(Math.ceil(this.#count / this.#limit));

	constructor({ count, limit, start }: PaginationProps) {
		if (limit) {
			this.#limit = limit;
		}
		this.#count = count;
		if (start) {
			this.#page = start;
		}
	}

	set count(v: number) {
		this.#count = v;
	}

	set rootElement(v: HTMLElement) {
		this.#root = v;
	}

	get page() {
		return this.#page;
	}

	get totalPage() {
		return this.#totalPage;
	}

	get rangeStart() {
		return (this.#page - 1) * this.#limit;
	}

	get rangeEnd() {
		return Math.min(this.rangeStart + this.#limit, this.#count);
	}

	prevButtonHandler = () => {
		if (this.#page <= 1) return;
		this.#page--;
		this.#jumpToRoot();
	};

	nextButtonHandler = () => {
		if (this.#page >= this.#totalPage) return;
		this.#page++;
		this.#jumpToRoot();
	};

	firstButtonHandler = () => {
		this.#page = 1;
		this.#jumpToRoot();
	};

	lastButtonHandler = () => {
		this.#page = this.#totalPage;
		this.#jumpToRoot();
	};

	#jumpToRoot = () => {
		if (!this.#root) return;
		this.#root.scrollIntoView(true);
	};
}
