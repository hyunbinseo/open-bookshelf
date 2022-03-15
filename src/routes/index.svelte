<script lang="ts">
	import { onMount } from 'svelte';

	import Card from '$lib/components/Card.svelte';
	import Container from '$lib/components/Container.svelte';
	import { collapseAllDropdown } from '$lib/components/MenuBar/Dropdown.svelte';
	import Filters from '$lib/components/MenuBar/MenuBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import TopBar from '$lib/components/TopBar.svelte';

	import { isLanguage, isLevel, isTopic } from '$lib/stories/types';

	import {
		isLoaded,
		selLanguage,
		selLevel,
		selTopic,
		reqStories,
		urlSearchParams
	} from '$lib/stores';

	let header: HTMLElement;
	let headerIsVisible = true;

	let visitorCount = 0;

	onMount(async () => {
		const observer = new IntersectionObserver((entries) => {
			const [{ isIntersecting }] = entries;
			headerIsVisible = isIntersecting;
		});

		observer.observe(header);

		const { searchParams } = new URL(document.URL);

		const reqLanguage = searchParams.get('language');
		if (isLanguage(reqLanguage)) selLanguage.set(reqLanguage);

		const reqTopic = searchParams.get('topic');
		if (isTopic(reqTopic)) selTopic.set(reqTopic);

		const reqLevel = Number(searchParams.get('level'));
		if (isLevel(reqLevel)) selLevel.set(reqLevel);

		isLoaded.set(true);

		const { value } = await (
			await fetch('https://api.countapi.xyz/hit/bookshelf.hyunbin.page/')
		).json();

		visitorCount = value;
	});

	$: if ($isLoaded) window.history.replaceState(null, '', `?${$urlSearchParams}`);
</script>

<div class="flex flex-1 flex-col bg-gray-50 pb-12">
	<Sidebar />
	<TopBar />

	<div bind:this={header}>
		<Header heading="열린 책장" paragraph="읽고 싶은 책을 찾아볼까요?" />
	</div>

	{#if $reqStories.length}
		<Filters />
	{/if}

	<section aria-labelledby="stories-heading" class="mt-2 flex-1 pb-12">
		<h2 id="stories-heading" class="sr-only">이야기 목록</h2>
		<Container isFullHeight={true}>
			{#if !$reqStories.length}
				<div class="relative block flex h-full w-full flex-col justify-center text-center">
					{#if !$isLoaded}
						<h3 class="animate-pulse leading-6 text-gray-900">책을 찾고 있습니다.</h3>
					{:else}
						<h3 class="leading-6 text-gray-900">책을 찾을 수 없습니다.</h3>
						<button
							type="button"
							class="mt-2 text-base text-indigo-500"
							on:click={() => {
								collapseAllDropdown();
								selTopic.set(undefined);
								selLevel.set(undefined);
							}}
						>
							상세 검색 조건 초기화
							<span aria-hidden="true">&rarr;</span>
						</button>
					{/if}
				</div>
			{:else}
				<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
					{#each $reqStories as story, index (story.id)}
						<Card {story} lazilyLoadImg={Boolean(index + 1 > 8)} />
					{/each}
				</div>
			{/if}
		</Container>
	</section>

	{#if !headerIsVisible}
		<ScrollToTop />
	{/if}
</div>

<Footer>
	<div class="text-center lg:flex lg:items-center lg:justify-between">
		<p class="mb-3">
			{#if !visitorCount}
				방문자 통계를 불러오는 중입니다.
			{:else}
				{visitorCount}번째 방문자님, 반갑습니다.
			{/if}
		</p>
		<p>
			열린 책장 <a
				href="https://github.com/hyunbinseo/open-bookshelf#readme"
				class="text-indigo-600 hover:text-indigo-700">프로젝트 소개</a
			>
		</p>
	</div>
</Footer>
