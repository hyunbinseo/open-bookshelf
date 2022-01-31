<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import Dropdown from '$lib/components/MenuBar/Dropdown.svelte';

	import { sortProps, languageProps, topicProps, levelProps } from '$lib/stories/filters';

	import {
		sidebarExpanded,
		sidebarToggle,
		selLanguage,
		selLevel,
		selTopic,
		selSort
	} from '$lib/stores';
</script>

<section
	aria-labelledby="filter-heading"
	class="sticky top-0 z-10 bg-gray-50 bg-opacity-90 backdrop-blur-sm"
>
	<Container>
		<div class="border-t border-gray-200 py-6">
			<h2 id="filter-heading" class="sr-only">상세 검색</h2>
			<div class="flex items-center justify-between">
				<Dropdown bind:value={$selSort} {...sortProps} alignToLeft={true} />

				<!-- Mobile filter dialog toggle, controls the 'mobileFilterDialogOpen' state. -->
				<button
					bind:this={$sidebarToggle}
					type="button"
					class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
					on:click={() => {
						sidebarExpanded.set(true);
					}}
				>
					상세 검색
				</button>

				<div class="hidden sm:flex sm:items-baseline sm:space-x-8">
					<Dropdown bind:value={$selLanguage} {...languageProps} />
					<Dropdown bind:value={$selTopic} {...topicProps} />
					<Dropdown bind:value={$selLevel} {...levelProps} />
				</div>
			</div>
		</div>
	</Container>
</section>
