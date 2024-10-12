import { Icons } from '$components/Icons';

interface IconProps {
	name: keyof typeof Icons;
	class?: string;
	size?: number;
}
export default function Icon(props: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.size ?? 24}
			height={props.size ?? 24}
			viewBox="0 0 24 24"
			fill="none"
			stroke={props.name === 'explicit' ? 'none' : 'currentColor'}
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			class={props.class && props.class}
			classList={{ explicit: props.name === 'explicit' }}
			innerHTML={Icons[props.name]}
		/>
	);
}
