<span data-is-live class="live-sign" aria-hidden="true">
	<span class="pulse"></span>
	<span></span>
</span>

<style>
	.live-sign {
		position: relative;
		display: inline-flex;
		inline-size: calc(var(--pl-spacing) * 2);
		block-size: calc(var(--pl-spacing) * 2);
		margin-right: var(--pl-spacing);

		& > span {
			border-radius: 9999px;
			width: 100%;
			height: 100%;
			background-color: var(--pl-secondary);

			&:is(.pulse) {
				display: inline;
				position: absolute;
				animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
			}
		}
	}
</style>
