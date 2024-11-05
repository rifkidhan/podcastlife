import EpisodeCard from '$components/common/episode-card'
import Button from '$components/ui/button'
import type { Episode, Feed } from '$lib/types'
import { For, Show, createMemo, createSignal, onCleanup } from 'solid-js'
import s from './podcast-grouping.module.css'
import { groupBy } from '$lib/utils/group'

interface PaginationProps<T> {
	data: T[]
	feed: Feed
	limit?: number
	start?: number
	title: string
}

export default function Pagination<T extends Episode>({
	data,
	feed,
	limit = 20,
	start = 1,
	title
}: PaginationProps<T>) {
	/**
	 * Grouping by season if available.
	 * If season undefined, season start with 0.
	 */
	const episodesGroup = groupBy(data, (item) => (item.season ? item.season : 0))
	const keys = Array.from(episodesGroup.keys()).sort((a, b) => b - a)

	const [season, setSeason] = createSignal(keys[0])

	const episodesPerSeason = createMemo(() => episodesGroup.get(season()))

	/**
	 * Set pagination.
	 */
	const [page, setPage] = createSignal(start)

	const episodesLength = createMemo(() => {
		if (typeof episodesPerSeason() === 'undefined') {
			return 1
		}

		return episodesPerSeason().length
	})

	const totalPage = createMemo(() => Math.ceil(episodesLength() / limit))
	const rangeStart = createMemo(() => (page() - 1) * limit)
	const rangeEnd = createMemo(() => Math.min(rangeStart() + limit, episodesLength()))

	const episodes = createMemo(() => episodesPerSeason()?.slice(rangeStart(), rangeEnd()))

	let rootElement!: HTMLElement

	const jumpToRootElement = () => {
		rootElement.scrollIntoView()
	}

	const jumpToFirst = () => {
		if (page() === 1) return

		setPage(1)
		jumpToRootElement()
	}

	const previousPage = () => {
		if (page() <= 1) return

		setPage(page() - 1)
		jumpToRootElement()
	}

	const nextPage = () => {
		if (page() >= totalPage()) return

		setPage(page() + 1)
		jumpToRootElement()
	}

	const jumpToLast = () => {
		if (page() === totalPage()) return

		setPage(totalPage())
		jumpToRootElement()
	}

	onCleanup(() => {
		episodesGroup.clear()
	})

	return (
		<section ref={rootElement} class={s.root}>
			<div class={s.header}>
				<h2 class="text-lg">{title}</h2>
				<Show when={keys.length > 1}>
					<select
						id="season-select"
						aria-label="Choose season"
						onChange={(e) => {
							e.preventDefault()
							setSeason(Number(e.target.value))
							setPage(1)
						}}
						class={s.select}
					>
						<For each={keys}>{(item) => <option value={item}>Season {item}</option>}</For>
					</select>
				</Show>
			</div>
			<ul class={s['episode-list']}>
				<For each={episodes()}>
					{(item) => (
						<li>
							<EpisodeCard
								feed={feed.title}
								feedId={feed.id}
								title={item.title ?? 'untitled'}
								image={item.image ?? feed.image}
								summary={item.subtitle ?? item.summary ?? item.description}
								publishedDate={item.pubDate}
								duration={item.duration}
								explicit={item.explicit}
								guid={item.guid ?? ''}
								enclosure={item.enclosure.url}
								altEnclosure={item.alternativeEnclosures}
								episode={item.episode ?? item.itunesEpisode}
							/>
						</li>
					)}
				</For>
			</ul>
			<Show when={episodesLength() > limit}>
				<div class={s.pagination}>
					<Button
						icon="chevrons-left"
						aria-label="Go to first page"
						onClick={jumpToFirst}
						disabled={page() === 1}
					/>
					<Button
						icon="chevron-left"
						aria-label="Go to previous page"
						onClick={previousPage}
						disabled={page() <= 1}
					/>
					<span>
						{page()} / {totalPage()}
					</span>
					<Button
						icon="chevron-right"
						aria-label="Go to next page"
						onClick={nextPage}
						disabled={page() >= totalPage()}
					/>
					<Button
						icon="chevrons-right"
						aria-label="Go to last page"
						onClick={jumpToLast}
						disabled={page() >= totalPage()}
					/>
				</div>
			</Show>
		</section>
	)
}
