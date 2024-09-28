<script lang="ts">
	import { Head, Image } from '$lib/components';

	const original =
		'https://megaphone.imgix.net/podcasts/636a47b4-0a48-11ec-9d9f-e3a5908b0aaa/image/OD_New.png?ixlib=rails-4.3.1&max-w=3000&max-h=3000&fit=crop&auto=format,compress';

	const url =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAADDUExURQD16CXx5mv8957//5j//2X//yX//AD/+gjMuS29sXPa0Kv/+rn//5T//03/9xn/7ROiii+JfWO1p5T14ab/+JT/81z/4S/41SiBbzVwZFqikH3oy33/2mvsx0rOqzHBn0NoYU1oY2iViH3StWrkuEe4kC+AZSVuWEtSUlhgYGuCe3OplFmxjTCAXxdDMRMxJi0vMDxKR0poYEd2Zy9uVg5JMwAdEAAMBQAEBQ8rJRdLPg5KOAA6JQAkEgAHAAAAAP///0RSd4sAAAABYktHRED+2VzYAAAAB3RJTUUH6AkaFic3fqQubQAAAFBJREFUCNdjYGBkYmZhZWNn4ODk4ubh5eNnEBAUEhYRFRNnkJCUkpaRlZNnUFBUUlZRVVNn0NDU0tbR1dNnMDA0MjYxNTNnsLC0sraxtbMHALv4B+GMrpsgAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTA5LTI2VDIyOjM5OjU0KzAwOjAwUbmHVgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0wOS0yNlQyMjozOTo1NCswMDowMCDkP+oAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjQtMDktMjZUMjI6Mzk6NTQrMDA6MDB38R41AAAAK3RFWHRoaXN0b2dyYW06Y29udHJhc3Qtc3RyZXRjaAAxNS4yOTQxeDg4LjIzNTMl4jwPsAAAAABJRU5ErkJggg==';

	const url2 =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfoCRoWFROv157NAAAAvElEQVQY0wXB60rDQBCA0W9md7PpxV4iGCteKYjv6xP6LxXUgtZmTTLjOTJdvfpEwaygqcJtwq0QFnPCYkm0qcdrhe0Wmg2ce/z4iecKljVxmL4JN4/oU4tuVlj3AcMvqEIViGl3h7w8IM87UEX6gnYVYg6qRM0zPCX8bwADHCRnJAVoLoh2OuFvB/zwjmiE0fA64bcN3LfE8ecL7RyGERBsXWOXGWnXsL8m9uXIrJ8TzoaYY+r4SnECSOYf0ctOhSd1VWEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDktMjZUMjI6MjE6MTgrMDA6MDDACnzsAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI0LTA5LTI2VDIyOjIxOjE4KzAwOjAwsVfEUAAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyNC0wOS0yNlQyMjoyMToxOCswMDowMOZC5Y8AAAArdEVYdGhpc3RvZ3JhbTpjb250cmFzdC1zdHJldGNoADE4LjQzMTR4NjMuOTIxNiVhAWEjAAAAAElFTkSuQmCC';

	const url3 =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfoCRoWDQygxAthAAAAoklEQVQY00XPsUoDURCF4S/ey8DiwkJg8UIgaCOkSiFpA1a+ga9p61ME8wRpUwUigrCyrMVNdGA4xRnOf2Y2eZv4xhmBEXtsUOR/Y0kUhjOauvOQSVjw/MhDz8eB3QmJLmQKr2u2Xb09zdm1GIgk0xJNJY0u01ISqzuzyfukLGhuuA1+Ro6fvNyz7WUOHMcaKWq56Fj2PLl+MVzyv6oO6Q/3C6ytJz0q6wkwAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTA5LTI2VDIyOjEzOjExKzAwOjAwyIWPAwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0wOS0yNlQyMjoxMzoxMSswMDowMLnYN78AAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjQtMDktMjZUMjI6MTM6MTErMDA6MDDuzRZgAAAAJnRFWHRoaXN0b2dyYW06Y29udHJhc3Qtc3RyZXRjaAAyNi4yNzQ1eDYwJdEmhbIAAAAASUVORK5CYII=';
</script>

<Head title="About Podcastlife" />
<main class="page">
	<h1 class="text-display">About</h1>
	<section>
		<div class="image">
			<Image src={original} alt="test" full />
		</div>
		<div class="image">
			<Image src={url} alt="test" full />
		</div>
		<div class="image">
			<Image src={url2} alt="test" full />
		</div>
		<div class="image">
			<Image src={url3} alt="test" full />
		</div>
	</section>
</main>

<style>
	main {
		width: 90dvw;
		margin-inline: auto;
	}
	section {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 2rem;
	}
	.image {
		display: block;
		position: relative;
		width: 300px;
		height: 300px;
		box-shadow:
			1px 1px 0 0 hsl(var(--pl-accent-95)),
			3px 3px 0 0 hsl(var(--pl-picton)),
			5px 5px 0 0 hsl(var(--pl-accent-95));
		border: 4px solid hsl(var(--pl-accent-95));
		border-radius: var(--pl-border-radius-md);
		overflow: hidden;
	}
</style>
