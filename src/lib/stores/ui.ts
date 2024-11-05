import { createSignal } from 'solid-js'
import { playerDetail } from './player'

const [menuOpen, setMenuOpen] = createSignal(false)
const player = () => playerDetail().queue.now.feed.id !== ''

export const useUI = () => {
	return {
		menuOpen,
		setMenuOpen,
		player
	}
}
