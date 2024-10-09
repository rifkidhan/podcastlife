<span data-is-live class="sign" aria-hidden="true">
	<span class="pulse"></span>
	<span></span>
</span>

<style>
	.sign {
		position: relative;
		display: inline-flex;
		width: 0.5rem;
		height: 0.5rem;

		& > span {
			border-radius: 9999px;
			width: 100%;
			height: 100%;
			background-color: hsl(var(--pl-cinnabar));

			&:is(.pulse) {
				display: inline;
				position: absolute;
				animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
			}
		}
	}
</style>
