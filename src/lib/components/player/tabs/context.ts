import { setContext, getContext } from "svelte";

const key = Symbol("TABS");

type ActiveTabs = {
	active: string;
};

export type ListType = {
	id: string;
	title: string;
}[];

export const setTabContext = (input: () => string) => {
	const tabs = {
		get active() {
			return input();
		}
	};
	setContext(key, tabs);
};

export const getTabContext = () => {
	return getContext(key) as ActiveTabs;
};
