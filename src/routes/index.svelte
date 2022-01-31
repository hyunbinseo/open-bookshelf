<script lang="ts">
	import { onMount } from 'svelte';

	import Card from '$lib/components/Card.svelte';
	import Container from '$lib/components/Container.svelte';
	import Filters from '$lib/components/MenuBar/MenuBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';

	import { isLanguage, isLevel, isTopic } from '$lib/stories/types';

	import { isLoaded, selLanguage, selLevel, selTopic, reqStories } from '$lib/stores';

	onMount(() => {
		const { searchParams } = new URL(document.URL);

		const reqLanguage = searchParams.get('language');
		if (isLanguage(reqLanguage)) selLanguage.set(reqLanguage);

		const reqTopic = searchParams.get('topic');
		if (isTopic(reqTopic)) selTopic.set(reqTopic);

		const reqLevel = Number(searchParams.get('level'));
		if (isLevel(reqLevel)) selLevel.set(reqLevel);

		history.replaceState(null, '', '/');

		isLoaded.set(true);
	});

	let scrollY: number;
</script>

<svelte:window bind:scrollY />

<div class="flex-1 bg-gray-50">
	<Sidebar />
	<Header heading="두루책방" paragraph="찾아줘서 고마워요! 읽고 싶은 책을 찾아볼까요?" />
	<Filters />
	<Container>
		<section aria-labelledby="stories-heading" class="mt-2 pb-16">
			<h2 id="stories-heading" class="sr-only">이야기 목록</h2>
			{#if !$isLoaded}
				<p>불러오는 중입니다.</p>
			{:else if !$reqStories.length}
				<p>검색 결과가 없습니다.</p>
				<button
					on:click={() => {
						selTopic.set(undefined);
						selLevel.set(undefined);
						scrollY = 0;
					}}
				>
					검색 조건 초기화
				</button>
			{:else}
				<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
					{#each $reqStories as story (story.id)}
						<Card {story} />
					{/each}
				</div>
			{/if}
		</section>
	</Container>
</div>
<Footer>
	<a
		href="http://xn--hu1b40go5ck8x.com/"
		class="underline underline-offset-2"
		target="_blank"
		rel="noopener">두루책방</a
	>의 저작자는 도서문화재단씨앗과 에누마입니다.
</Footer>
