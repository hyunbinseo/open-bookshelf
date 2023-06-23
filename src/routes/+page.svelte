<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Container from '$lib/components/Container.svelte';
	import Download from '$lib/components/Download/Download.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { collapseAllDropdown } from '$lib/components/MenuBar/Dropdown.svelte';
	import Filters from '$lib/components/MenuBar/MenuBar.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import TopBar from '$lib/components/TopBar/TopBar.svelte';
	import {
		downloadModalState,
		isLoaded,
		reqStories,
		selLanguage,
		selLevel,
		selTopic,
		urlSearchParams
	} from '$lib/stores';
	import { isLanguage, isLevel, isTopic } from '$lib/stories/types';
	import { onMount } from 'svelte';

	let header: HTMLElement;
	let headerIsVisible = true;

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
	});

	$: if ($isLoaded) window.history.replaceState(null, '', `?${$urlSearchParams}`);
</script>

{#if $downloadModalState}
	<Download />
{/if}

<div class="flex flex-1 flex-col bg-gray-50 pb-12">
	<Sidebar />
	<TopBar />

	<div bind:this={header}>
		<Header />
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
	오류 및 개선 사항을 <a
		target="_blank"
		href="https://github.com/hyunbinseo/open-bookshelf/discussions/2"
		class="text-indigo-600 hover:text-indigo-700">알려주세요.</a
	>
</Footer>
