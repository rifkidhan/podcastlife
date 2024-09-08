import sanitizeHTML from 'sanitize-html';

export default function sanitize(content: string) {
	const data = sanitizeHTML(content, {
		allowedTags: ['ul', 'ol', 'li', 'p', 'div'],
		allowedAttributes: {}
	});
	return data;
}
