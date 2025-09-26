export const getTime = (date: string | number, locale: string = "en-GB") => {
	let day = new Date();
	let value = "";

	if (typeof date === "string") {
		day = new Date(date);
	}
	if (typeof date === "number") {
		day = new Date(date * 1000);
	}

	const diff = (new Date().getTime() - day.getTime()) / 1000;
	const hours = Math.floor(diff / 3600);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);

	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

	if (weeks > 1) {
		value = new Intl.DateTimeFormat(locale, {
			dateStyle: "medium"
		}).format(day);
	} else if (weeks > 0) {
		value = rtf.format(0 - weeks, "weeks");
	} else if (days > 0) {
		value = rtf.format(0 - days, "days");
	} else {
		value = rtf.format(0 - hours, "hours");
	}
	return value;
};

export const formatTime = (time: number) => {
	if (Number.isNaN(time)) return "...";

	const hours = Math.floor(time / 3600);
	const minutes = Math.floor((time % 3600) / 60);

	const seconds = Math.floor(time % 60);

	return `${hours > 0 ? `${hours}:` : ""}${hours > 0 && minutes < 10 ? `0${minutes}` : minutes}:${
		seconds < 10 ? `0${seconds}` : seconds
	}`;
};
