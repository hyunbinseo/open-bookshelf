<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import Dropdown from '$lib/components/MenuBar/Dropdown.svelte';

	import {
		sortOptions,
		sortOptionEnum,
		languages,
		languageEnum,
		levels,
		topics
	} from '$lib/stories/types';

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
				<Dropdown
					alignToLeft={true}
					title="정렬"
					name="sortOption"
					options={sortOptions}
					optionsEnum={sortOptionEnum}
					optionSuffix=" 순"
					bind:value={$selSort}
				/>

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
					<Dropdown
						title="언어"
						name="language"
						options={languages}
						optionsEnum={languageEnum}
						bind:value={$selLanguage}
					/>
					<Dropdown
						allowValueReset={true}
						title="주제"
						name="topic"
						options={topics}
						bind:value={$selTopic}
					/>
					<Dropdown
						allowValueReset={true}
						title="단계"
						name="level"
						options={levels}
						optionSuffix="단계"
						bind:value={$selLevel}
					/>
				</div>
			</div>
		</div>
	</Container>
</section>
