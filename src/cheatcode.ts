import CheatcodeEvent from "./CheatcodeEvent";

export default function cheatcode(
	target: EventTarget,
	code: string
): () => void {
	let input = "";
	let completions = 0;

	const handler = (event: KeyboardEvent) => {
		input += event.key;

		const correct = code.startsWith(input);
		const progress = correct ? input.length / code.length : 0;
		const complete = progress === 1;

		console.log(input, correct, progress);

		if (complete || correct === false) {
			input = "";
		}

		if (complete) {
			completions += 1;
		}

		const e: CheatcodeEvent = new CheatcodeEvent("cheatcode", {
			detail: {
				correct,
				progress,
				completions,
				code,
				complete,
				input,
			},
		});

		target.dispatchEvent(e);
	};

	target.addEventListener("keypress", handler);

	return (): void => {
		target.removeEventListener("keypress", handler);
	};
}
