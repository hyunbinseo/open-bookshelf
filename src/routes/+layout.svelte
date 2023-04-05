<script lang="ts">
	import './app.css';

	import stories from '$lib/stories/data';

	const title = '열린 책장 | 어린이 전자책 도서관';
	const description = `다양한 주제와 수준의 이야기 ${stories.length}개를 듣고 따라 읽으세요. 누구에게나 쉬운 책부터 여러 언어로 쓰인 다국어 책까지 모두 준비되어 있어요.`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
</svelte:head>

<slot />
