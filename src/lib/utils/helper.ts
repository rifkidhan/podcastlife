import { createEffect, createSignal, onCleanup } from 'solid-js'

export const getWindowScroll = () => {
	const [windowScroll, setWindowScroll] = createSignal(0)

	createEffect(() => {
		const setScroll = () => {
			setWindowScroll(window.scrollY)
		}

		window.addEventListener('scroll', setScroll)

		onCleanup(() => {
			window.removeEventListener('scroll', setScroll)
		})
	})

	return [windowScroll]
}

export const getWindowSize = () => {
	const [windowWidth, setWindowWidth] = createSignal(0)

	const setWidth = () => {
		setWindowWidth(window.innerWidth)
	}

	createEffect(setWidth)

	createEffect(() => {
		window.addEventListener('resize', setWidth)

		onCleanup(() => {
			window.removeEventListener('resize', setWidth)
		})
	})

	return [windowWidth]
}
