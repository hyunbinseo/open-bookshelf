<script lang="ts">
	import { onMount } from 'svelte';

	import {
		sortOptions,
		sortOptionEnum,
		languages,
		languageEnum,
		levels,
		topics
	} from '$lib/stories/types';
	import { isLanguage, isLevel, isTopic } from '$lib/stories/types';

	import { isLoaded, selLanguage, selLevel, selTopic, reqStories, selSort } from '$lib/stores';

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
</script>

<h3>정렬</h3>

{#each sortOptions as sortOption}
	<label>
		<input type="radio" bind:group={$selSort} name="sortOption" value={sortOption} />
		{sortOptionEnum[sortOption]}
	</label>
{/each}

<h3>언어</h3>

{#each languages as language}
	<label>
		<input type="radio" bind:group={$selLanguage} name="language" value={language} />
		{languageEnum[language]}
	</label>
{/each}

<h3>주제</h3>

<button
	on:click={() => {
		selTopic.set(undefined);
	}}>초기화</button
>

{#each topics as topic}
	<label>
		<input type="radio" bind:group={$selTopic} name="topic" value={topic} />
		{topic}
	</label>
{/each}

<h3>단계</h3>

<button
	on:click={() => {
		selLevel.set(undefined);
	}}>초기화</button
>

{#each levels as level}
	<label>
		<input type="radio" bind:group={$selLevel} name="level" value={level} />
		{level}
	</label>
{/each}

<h3>이야기</h3>

{#if !$isLoaded}
	불러오는 중입니다.
{:else if !$reqStories.length}
	검색 결과가 없습니다.
	<button
		on:click={() => {
			selTopic.set(undefined);
			selLevel.set(undefined);
		}}
	>
		필터 초기화
	</button>
{:else}
	<ul>
		{#each $reqStories as story}
			<li>
				<a
					href={`http://xn--hu1b40go5ck8x.com/e-book/ecatalog5.php?Dir=${story.id}&catimage=1`}
					target="_blank"
					rel="noopener"
				>
					{story.title}
				</a>
			</li>
		{/each}
	</ul>
{/if}
