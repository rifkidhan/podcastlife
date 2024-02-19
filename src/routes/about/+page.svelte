<script lang="ts">
	import { createTimeline, createAnimate } from '$lib/utils/motion';

	const { segment } = createTimeline();

	const { animate } = createAnimate({
		keyframe: {
			rotate: [0, 90]
		},
		options: {
			duration: 10
		}
	});
</script>

<main>
	<div class="flex min-h-screen flex-col gap-10">
		<span> About </span>

		<div
			use:segment={{
				keyframe: {
					opacity: [0, 1]
				},
				options: {
					duration: 2
				}
			}}
		>
			Test
		</div>

		<div
			use:segment={{
				keyframe: {
					opacity: [0, 1]
				},
				options: {
					duration: 2,
					at: '>'
				}
			}}
		>
			Test 2
		</div>
		<div
			use:segment={{
				keyframe: {
					opacity: [0, 1]
				},
				options: {
					duration: 2,
					at: '<'
				}
			}}
		>
			Test 3
		</div>
	</div>
</main>
