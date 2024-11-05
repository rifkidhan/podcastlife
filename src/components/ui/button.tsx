import { Icons } from '$components/Icons'
import type { ComponentProps } from 'solid-js'
import Icon from './icon'
import { splitProps, Show, mergeProps } from 'solid-js'
import s from './button.module.css'

const Spinner = () => {
	return (
		<span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class={s.spin}
				aria-hidden="true"
			>
				<path d="M21 12a9 9 0 1 1-6.219-8.56" />
			</svg>
		</span>
	)
}

interface Props extends ComponentProps<'button'> {
	variant?: 'primary' | 'picton' | 'cerise' | 'text'
	size?: 'sm' | 'md' | 'lg' | 'fit' | 'full'
	circle?: boolean
	disabled?: boolean
	loading?: boolean
	icon?: keyof typeof Icons
}

export default function Button(props: Props) {
	const mergedProps = mergeProps(
		{
			variant: 'primary',
			size: 'md',
			circle: false
		},
		props
	)

	const [theme, attrs] = splitProps(mergedProps, [
		'variant',
		'size',
		'circle',
		'disabled',
		'loading',
		'icon'
	])
	return (
		<button
			type={attrs.type ?? 'button'}
			classList={{
				[s.button]: true,
				[s.primary]: theme.variant === 'primary',
				[s.picton]: theme.variant === 'picton',
				[s.text]: theme.variant === 'text',
				[s.cerise]: theme.variant === 'cerise',
				[s.sm]: theme.size === 'sm',
				[s.md]: theme.size === 'md',
				[s.lg]: theme.size === 'lg',
				[s.fit]: theme.size === 'fit',
				[s.full]: theme.size === 'full',
				[s.circle]: theme.circle
			}}
			disabled={theme.disabled}
			data-loading={theme.loading}
			{...attrs}
		>
			<Show when={!theme.loading} fallback={<Spinner />}>
				<Show when={theme.icon}>
					<span>
						<Icon name={theme.icon ?? 'podcastlife'} />
					</span>
				</Show>
			</Show>
			{attrs.children}
		</button>
	)
}
