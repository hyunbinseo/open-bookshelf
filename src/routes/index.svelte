<script lang="ts">
	import { onMount } from 'svelte';

	import stories from '$lib/stories/data';

	import { languageEnum } from '$lib/stories/types';
	import { languages, levels, topics } from '$lib/stories/types';
	import { isLanguage, isLevel, isTopic } from '$lib/stories/types';

	import type { Language, Level, Topic } from '$lib/stories/types';

	// Required value(s)
	let selLanguage: Language;

	// Optional value(s)
	let selLevel: Level;
	let selTopic: Topic;

	$: filteredStories = !selLanguage
		? [] // Empty before mount
		: stories
				.filter(({ language }) => language === selLanguage)
				.filter(({ level }) => (selLevel ? level === selLevel : true))
				.filter(({ topics }) => (selTopic ? topics.has(selTopic) : true));

	onMount(() => {
		const { searchParams } = new URL(document.URL);

		// Default language value is set on mount
		const reqLanguage = searchParams.get('language');
		selLanguage = isLanguage(reqLanguage) ? reqLanguage : 'ko-kr';

		const reqTopic = searchParams.get('topic');
		if (isTopic(reqTopic)) selTopic = reqTopic;

		const reqLevel = Number(searchParams.get('level'));
		if (isLevel(reqLevel)) selLevel = reqLevel;

		history.replaceState(null, '', '/');
	});
</script>

<h3>언어</h3>

{#each languages as language}
	<label>
		<input type="radio" bind:group={selLanguage} name="language" value={language} />
		{languageEnum[language]}
	</label>
{/each}

<h3>주제</h3>

<button
	on:click={() => {
		selTopic = undefined;
	}}>초기화</button
>

{#each topics as topic}
	<label>
		<input type="radio" bind:group={selTopic} name="topic" value={topic} />
		{topic}
	</label>
{/each}

<h3>단계</h3>

<button
	on:click={() => {
		selLevel = undefined;
	}}>초기화</button
>

{#each levels as level}
	<label>
		<input type="radio" bind:group={selLevel} name="level" value={level} />
		{level}
	</label>
{/each}

<h3>이야기</h3>

{#if filteredStories.length === 0}
	{#if !selLanguage}
		불러오는 중입니다.
	{:else}
		검색 결과가 없습니다.
		<button
			on:click={() => {
				selTopic = undefined;
				selLevel = undefined;
			}}
		>
			필터 초기화
		</button>
	{/if}
{:else}
	<ul>
		{#each filteredStories as story}
			<li>
				<a
					href={`http://xn--hu1b40go5ck8x.com/e-book/ecatalog5.php?Dir=${story.id}&catimage=1`}
					target="_blank"
				>
					{story.title}
				</a>
			</li>
		{/each}
	</ul>
{/if}
