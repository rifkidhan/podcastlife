export const getTime = (date: string | number) => {
	let day = new Date();

	if (typeof date === 'string') {
		day = new Date(date);
	}
	if (typeof date === 'number') {
		day = new Date(date * 1000);
	}
	const format = new Intl.DateTimeFormat(undefined, {
		dateStyle: 'medium',
		timeStyle: 'short'
	}).format(day);

	return format;
};

export const formatTime = (time: number) => {
	if (Number.isNaN(time)) return '...';

	const hours = Math.floor(time / 3600);
	const minutes = Math.floor((time % 3600) / 60);

	const seconds = Math.floor(time % 60);

	return `${hours > 0 ? `${hours}:` : ''}${hours > 0 && minutes < 10 ? `0${minutes}` : minutes}:${
		seconds < 10 ? `0${seconds}` : seconds
	}`;
};
