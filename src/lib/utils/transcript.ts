import { convertFile, Options } from 'transcriptator';

const transcript = (data: string) => {
	Options.setOptions({
		combineSegments: true,
		combineSegmentsLength: 70,
		combineEqualTimes: true,
		speakerChange: true
	});
	const result = convertFile(data);

	return result;
};

export default transcript;
