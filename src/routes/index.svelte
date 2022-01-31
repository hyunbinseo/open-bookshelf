<script lang="ts">
	import { onMount } from 'svelte';

	import Card from '$lib/components/Card.svelte';
	import Container from '$lib/components/Container.svelte';
	import { collapseAllDropdown } from '$lib/components/MenuBar/Dropdown.svelte';
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

<div class="flex flex-1 flex-col bg-gray-50">
	<Sidebar />
	<Header heading="두루책방" paragraph="찾아줘서 고마워요! 읽고 싶은 책을 찾아볼까요?" />
	<Filters />
	<section aria-labelledby="stories-heading" class="mt-2 flex-1 pb-16">
		<h2 id="stories-heading" class="sr-only">이야기 목록</h2>
		<Container isFullHeight={true}>
			{#if !$reqStories.length}
				<button
					type="button"
					class="relative block h-full w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					disabled={!$isLoaded}
					on:click={() => {
						collapseAllDropdown();
						selTopic.set(undefined);
						selLevel.set(undefined);
					}}
				>
					{#if !$isLoaded}
						<h3 class="text-lg font-medium leading-6 text-gray-900">책을 찾고 있습니다.</h3>
						<p class="mt-2 text-xs text-gray-500">불러와지지 않으면 꼬리말의 링크를 사용합니다.</p>
					{:else}
						<h3 class="text-lg font-medium leading-6 text-gray-900">책을 찾을 수 없습니다.</h3>
						<p class="mt-2 text-sm text-indigo-500">
							상세 검색 조건 초기화
							<span aria-hidden="true">&rarr;</span>
						</p>
					{/if}
				</button>
			{:else}
				<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
					{#each $reqStories as story (story.id)}
						<Card {story} />
					{/each}
				</div>
				<p class="pt-16 text-center lg:hidden">목록의 끝입니다.</p>
			{/if}
		</Container>
	</section>
</div>
<Footer>
	<a
		href="http://xn--hu1b40go5ck8x.com/"
		class="underline underline-offset-2"
		target="_blank"
		rel="noopener">두루책방</a
	>의 저작자는 도서문화재단씨앗과 에누마입니다.
</Footer>
