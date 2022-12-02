<script lang="ts">
	const { VITE_CDN_URL } = import.meta.env;

	export let name: string;
	export let emoji: string;
	export let color: string;

	const pdfFilename = encodeURIComponent(`열린 책장 기록장 (${name})`);
	const imgFilename = encodeURIComponent(`열린-책장-기록장-${name}`);
</script>

<a
	download
	href={`${VITE_CDN_URL}/pdf/${pdfFilename}.pdf`}
	target="_blank"
	rel="noreferrer"
	class="group overflow-hidden rounded-xl shadow-md hover:ring-2 hover:ring-indigo-500"
>
	<div
		class="overflow-hidden rounded-t-xl"
		style="-webkit-transform: translate3d(0, 0, 0); -moz-transform: translate3d(0, 0, 0); background-color: {color};"
	>
		<picture>
			<source srcset={`${VITE_CDN_URL}/image/printable/${imgFilename}.webp`} type="image/webp" />
			<img
				class="transition-transform duration-300 ease-out group-hover:scale-110"
				src={`${VITE_CDN_URL}/image/printable/${imgFilename}.jpg`}
				alt={`열린 책장 기록장 (${name}) 표지`}
				width="595"
				height="842"
			/>
		</picture>
	</div>
	<div class="w-full rounded-b-xl py-3 text-center text-gray-700">
		다운로드 {emoji}
	</div>
</a>
