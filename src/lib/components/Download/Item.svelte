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
	rel="noopener"
	class="overflow-hidden rounded-xl shadow-md transition-opacity hover:opacity-80"
>
	<picture>
		<source srcset={`${VITE_CDN_URL}/image/printable/${imgFilename}.webp`} type="image/webp" />
		<img
			style="background-color: {color};"
			src={`${VITE_CDN_URL}/image/printable/${imgFilename}.jpg`}
			alt={`열린 책장 기록장 (${name}) 표지`}
			width="595"
			height="842"
		/>
	</picture>
	<div class="w-full rounded-b-xl py-3 text-center text-gray-700">
		다운로드 {emoji}
	</div>
</a>
