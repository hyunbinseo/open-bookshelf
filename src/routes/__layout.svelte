<script lang="ts">
	import '$lib/tailwind.css';

	import stories from '$lib/stories/data';

	const description = `다양한 주제와 수준의 이야기 ${stories.length}개를 따라 읽고 들으세요. 느린 학습자를 위한 쉬운 책, 다문화 가정 어린이를 위한 다국어 책도 있습니다.`;
</script>

<svelte:head>
	<meta name="description" content={description} />
</svelte:head>

<slot />
