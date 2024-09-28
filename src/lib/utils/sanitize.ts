import sanitizeHTML from 'sanitize-html';
import type { IOptions } from 'sanitize-html';

export default function sanitize(
	content: string,
	opts: IOptions = { allowedTags: ['ul', 'ol', 'li', 'p', 'div', 'strong'], allowedAttributes: {} }
) {
	const data = sanitizeHTML(content, opts);
	return data;
}
