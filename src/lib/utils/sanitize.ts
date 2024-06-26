import sanitizeHTML from 'sanitize-html';

const sanitize = (content: string) => {
	const data = sanitizeHTML(content, {
		allowedTags: [
			'address',
			'article',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'hgroup',
			'section',
			'blockquote',
			'dd',
			'div',
			'dl',
			'dt',
			'figcaption',
			'figure',
			'li',
			'main',
			'ol',
			'p',
			'pre',
			'ul',
			'a',
			'abbr',
			'b',
			'bdi',
			'bdo',
			'cite',
			'code',
			'data',
			'dfn',
			'em',
			'i',
			'kbd',
			'mark',
			'q',
			'rb',
			'rp',
			'rt',
			'rtc',
			'ruby',
			's',
			'samp',
			'small',
			'span',
			'strong',
			'sub',
			'sup',
			'time',
			'u',
			'wbr',
			'caption',
			'col',
			'colgroup',
			'table',
			'tbody',
			'td',
			'tfoot',
			'th',
			'thead',
			'tr'
		],
		transformTags: {
			a: sanitizeHTML.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' })
		}
	});

	return data;
};

export default sanitize;
