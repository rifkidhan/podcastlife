import { convertFile, Options } from "transcriptator";

export default function transcript(data: string) {
	Options.setOptions({
		combineEqualTimes: true,
		combineSegmentsLength: 120,
		speakerChange: true
	});

	return convertFile(data);
}
