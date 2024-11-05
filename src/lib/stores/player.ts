import type { AlternativeEnclosure } from '$lib/types'
import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'

export interface FeedPlaying {
	id: string
	title: string
}

export interface PodcastPlaying {
	guid: string
	title: string
	enclosure: string
	image: string
	explicit?: boolean
	altEnclosure?: AlternativeEnclosure[]
}

interface PlayNow {
	feed: FeedPlaying
	podcast: PodcastPlaying
}

const [queue, setQueue] = createStore<{ now: PlayNow; next: Array<PlayNow> }>({
	now: {
		feed: {
			title: '',
			id: ''
		},
		podcast: {
			title: '',
			image: '',
			enclosure: '',
			guid: ''
		}
	},
	next: []
})

const setDefaultPlayNow = () => {
	setQueue('now', {
		feed: {
			title: '',
			id: ''
		},
		podcast: {
			title: '',
			image: '',
			enclosure: '',
			guid: ''
		}
	})
}

const [paused, setPaused] = createSignal(true)
const [loading, setLoading] = createSignal(true)
const [duration, setDuration] = createSignal(0)
const [currentTime, setCurrentTime] = createSignal(0)

export const playerDetail = () => {
	return {
		paused,
		setPaused,
		loading,
		setLoading,
		duration,
		setDuration,
		currentTime,
		setCurrentTime,
		setDefaultPlayNow,
		queue,
		setQueue
	}
}
