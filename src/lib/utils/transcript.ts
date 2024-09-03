import { convertFile, Options } from 'transcriptator';

export default function transcript(data: string) {
	Options.setOptions({
		combineSegments: true,
		combineSegmentsLength: 70,
		combineEqualTimes: true,
		speakerChange: true
	});

	return convertFile(data);
}
