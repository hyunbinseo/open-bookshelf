<script lang="ts">
	const { VITE_CDN_URL } = import.meta.env;

	import { colors } from '$lib/stories/colors';

	import type { Story } from '$lib/stories/types';

	export let lazilyLoadImg = false;
	export let story: Story;

	const generateImgSrc = (extension: 'webp' | 'jpg') =>
		`${VITE_CDN_URL}/image/cover/${story.number}.${extension}`;
</script>

<a
	class="group rounded-lg shadow-md hover:ring-2 hover:ring-indigo-500"
	href={`http://xn--hu1b40go5ck8x.com/e-book/ecatalog5.php?Dir=${story.id}&catimage=1`}
	target="_blank"
	rel="noopener"
>
	<div
		class="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-t-lg"
		style={`-webkit-transform: translate3d(0, 0, 0); -moz-transform: translate3d(0, 0, 0); background-color: ${
			colors[story.number]
		};`}
	>
		<picture>
			<source srcset={generateImgSrc('webp')} type="image/webp" />
			<img
				src={generateImgSrc('jpg')}
				alt={`${story.title} 표지`}
				class="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-125"
				loading={lazilyLoadImg ? 'lazy' : null}
				width="640"
				height="360"
			/>
		</picture>
	</div>
	<div class="flex items-center justify-between rounded-b-lg p-4 text-base text-gray-900 sm:py-3">
		<h3 class="truncate" style="word-break: keep-all;">
			<span>{story.title}</span>
			<span class="text-gray-500">({story.level}단계)</span>
		</h3>
		<p class="whitespace-pre sm:ml-3">{story.id}번</p>
	</div>
</a>
