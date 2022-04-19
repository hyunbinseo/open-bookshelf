<script lang="ts">
	const { VITE_CDN_URL } = import.meta.env;

	export let name: string;
	export let color: string;

	const pdfFilename = encodeURIComponent(`열린 책장 기록장 (${name})`);
	const imgFilename = encodeURIComponent(`열린-책장-기록장-${name}`);
</script>

<a
	download
	href={`${VITE_CDN_URL}/pdf/${pdfFilename}.pdf`}
	class="min-h-80 overflow-hidden rounded-xl shadow-md transition-opacity hover:opacity-75"
	style="background-color: {color};"
	target="_blank"
	rel="noopener"
>
	<picture>
		<source srcset={`${VITE_CDN_URL}/image/printable/${imgFilename}.webp`} type="image/webp" />
		<img
			src={`${VITE_CDN_URL}/image/printable/${imgFilename}.jpg`}
			alt={`열린 책장 기록장 (${name}) 표지`}
			width="595"
			height="842"
		/>
	</picture>
</a>
