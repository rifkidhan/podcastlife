import RunningText from '$components/common/running-text';
import Button from '$components/ui/button';
import Image from '$components/ui/image';
import Progress from '$components/ui/progress';
import Slider from '$components/ui/slider';
import Icon from '$components/ui/icon';
import { playerDetail } from '$lib/stores/player';
import { useUI } from '$lib/stores/ui';
import { formatTime } from '$lib/utils/time';
import { For, Match, Show, Switch, createEffect, createMemo, createSignal } from 'solid-js';
import LiveSign from '$components/common/live-sign';
import { getWindowSize } from '$lib/utils/helper';
import s from './player.module.css';

export default function Player() {
	const {
		setCurrentTime,
		setDuration,
		setLoading,
		setPaused,
		playNow,
		currentTime,
		paused,
		loading,
		duration
	} = playerDetail();
	const uiState = useUI();
	const [loadStart, setLoadStart] = createSignal(true);
	const [fullPlayerOpen, setFullPlayerOpen] = createSignal(false);
	const [volume, setVolume] = createSignal(1);
	const [windowSize] = getWindowSize();

	let audio!: HTMLAudioElement;

	let playerFull!: HTMLDialogElement;

	const playerReady = createMemo(() => playNow().feed.id !== '');

	createEffect(() => {
		if (playerReady()) {
			if (paused()) {
				audio.pause();
			} else {
				audio.play();
			}
		}
	});

	const fullPlayerState = {
		open: () => {
			if (!playerFull) return;
			playerFull.showModal();
			setFullPlayerOpen(true);
		},
		close: () => {
			if (!playerFull) return;
			playerFull.close();
			setFullPlayerOpen(false);
		}
	};

	return (
		<Show when={playerReady()}>
			<div class={s.player} inert={uiState.menuOpen()}>
				<audio
					ref={audio}
					src={playNow().podcast.enclosure}
					preload="metadata"
					onloadstart={() => {
						setCurrentTime(0);
						setLoadStart(true);
						setLoading(true);
						navigator.mediaSession.metadata = new MediaMetadata({
							title: playNow().podcast.title,
							artist: playNow().feed.title,
							artwork: [
								{
									src: playNow().podcast.image
								}
							]
						});
					}}
					ondurationchange={() => {
						setDuration(Math.round(audio.duration));
					}}
					onloadeddata={() => {
						setPaused(false);
						setLoadStart(false);
					}}
					oncanplaythrough={() => {
						setLoading(false);
						audio.play();
					}}
					ontimeupdate={() => {
						setCurrentTime(Math.trunc(audio.currentTime));
					}}
					onseeking={() => {
						setLoadStart(false);
						setLoading(true);
					}}
					onended={() => {
						setPaused(true);
						setCurrentTime(0);
					}}
				>
					<Show when={playNow().podcast.altEnclosure}>
						<For each={playNow().podcast.altEnclosure}>
							{(item) => (
								<Switch>
									<Match when={item.default}>
										<source src={item.source[0].uri} type={item.type} />
									</Match>
									<Match when={!item.default}>
										<source src={item.source[0].uri} type={item.type} />
									</Match>
								</Switch>
							)}
						</For>
					</Show>
				</audio>

				<div class={s.seeker}>
					<Show
						when={Number.isFinite(duration()) && windowSize() > 1024}
						fallback={<Progress value={currentTime()} max={Math.round(duration())} />}
					>
						<Slider
							id="player-seeker"
							value={currentTime()}
							max={Math.round(duration())}
							onInput={(e) => {
								setCurrentTime(Number(e.target.value));
								audio.currentTime = currentTime();
							}}
						/>
					</Show>
				</div>
				<div class={s.wrapper}>
					<div class={s.controls}>
						<span class={s.backward}>
							<Button
								type="button"
								aria-label="skip 10 second backward"
								icon="skip-backward"
								onClick={() => {
									audio.currentTime = currentTime() - 10;
								}}
							/>
						</span>
						<span class={s.play}>
							<Button
								variant="picton"
								type="button"
								aria-label="Play podcast"
								aria-pressed={!paused()}
								loading={loading()}
								icon={paused() ? 'play' : 'pause'}
								onClick={() => setPaused(!paused())}
							/>
						</span>
						<span class={s.forward}>
							<Button
								type="button"
								aria-label="skip 10 second forward"
								icon="skip-forward"
								onClick={() => {
									audio.currentTime = currentTime() + 10;
								}}
							/>
						</span>
					</div>
					<div class={`${s.duration} text-sm`}>
						<Switch>
							<Match when={loadStart() && loading()}>
								<span>--/--</span>
							</Match>
							<Match when={!Number.isFinite(duration())}>
								<span class={s['live-sign']}>
									<LiveSign />
									<span>Live</span>
								</span>
							</Match>
							<Match when={!loadStart()}>
								<span>{formatTime(currentTime())}</span>
								<span>/</span>
								<span>{formatTime(duration())}</span>
							</Match>
						</Switch>
					</div>
					<div class={s.info}>
						<div class={s.thumbnail}>
							<Image src={playNow().podcast.image} alt={playNow().podcast.title} full />
						</div>
						<div class={`${s.title} text-sm`}>
							<div class={s.running}>
								<RunningText title={playNow().podcast.title} marginBottom="0.25rem">
									{playNow().podcast.title}
								</RunningText>
							</div>
							<a href={`/podcast/${playNow().feed.id}`} class={s.feed}>
								<span>{playNow().feed.title}</span>
							</a>
						</div>
					</div>
					<div class={s.full}>
						<Button
							type="button"
							variant="picton"
							aria-label="open full player"
							icon="chevron-up"
							aria-expanded={fullPlayerOpen()}
							onClick={fullPlayerState.open}
						/>
					</div>
				</div>
				<dialog ref={playerFull} class={s['player-modal']}>
					<Show when={fullPlayerOpen()}>
						<div class={s['player-modal-wrapper']}>
							<div class={s['player-modal-img']}>
								<Image src={playNow().podcast.image} alt={playNow().podcast.title} full />
							</div>

							<div class={s['player-modal-detail']}>
								<div class="text-lg">
									<RunningText textAlign="center">{playNow().podcast.title}</RunningText>
								</div>
								<div class={s['player-modal-feed-title']}>{playNow().feed.title}</div>
							</div>
							<div class={s['player-modal-controls']}>
								<div class={`${s['player-modal-seeker']} text-sm`}>
									<Show
										when={Number.isFinite(duration())}
										fallback={
											<span class={s['live-sign']}>
												<LiveSign />
												<span data-full-player>Live</span>
											</span>
										}
									>
										<Slider
											id="seeker-full-player"
											value={currentTime()}
											min={0}
											max={duration()}
											onInput={(e) => {
												setCurrentTime(Number(e.target.value));
												audio.currentTime = currentTime();
											}}
										/>
										<div>{formatTime(currentTime())}</div>
										<div>{formatTime(duration())}</div>
									</Show>
								</div>
								<div class={s['player-modal-control']}>
									<Button
										type="button"
										size="lg"
										aria-label="skip 10 second backward"
										icon="skip-backward"
										onClick={() => {
											audio.currentTime = currentTime() - 10;
										}}
									/>
									<Button
										type="button"
										size="lg"
										variant="picton"
										aria-label="Play podcast"
										aria-pressed={!paused()}
										loading={loading()}
										icon={paused() ? 'play' : 'pause'}
										onClick={() => setPaused(!paused())}
									/>
									<Button
										type="button"
										size="lg"
										aria-label="skip 10 second forward"
										icon="skip-forward"
										onClick={() => {
											audio.currentTime = currentTime() + 10;
										}}
									/>
								</div>
								<div class={s['player-modal-volume']}>
									<span>
										<Icon name="volume" />
									</span>
									<Slider
										id="volume"
										value={volume()}
										step={0.1}
										min={0}
										max={1}
										onInput={(e) => {
											setVolume(Number(e.target.value));
											audio.volume = volume();
										}}
									/>
									<span>
										<Icon name="volume-full" />
									</span>
								</div>
							</div>
							<Button
								type="button"
								size="full"
								aria-label="close full player"
								icon="close"
								onClick={fullPlayerState.close}
							/>
						</div>
					</Show>
				</dialog>
			</div>
		</Show>
	);
}
