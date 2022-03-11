<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import Dropdown from '$lib/components/Sidebar/Dropdown.svelte';

	import { languageProps, topicProps, levelProps } from '$lib/stories/filters';

	import { sidebarEl, sidebarState, selLanguage, selLevel, selTopic } from '$lib/stores';
</script>

<svelte:window
	on:keydown={async (e) => {
		if ($sidebarState && e.code === 'Escape') sidebarState.collapse();
	}}
/>

{#if $sidebarState}
	<div
		transition:fade={{ duration: 300 }}
		bind:this={$sidebarEl}
		class="fixed inset-0 z-40 flex min-h-screen sm:hidden"
		role="dialog"
		aria-modal="true"
	>
		<!-- .touch-none required for body.overflow-hidden in iOS Safari -->
		<div
			class="fixed inset-0 min-h-screen touch-none bg-black bg-opacity-50"
			aria-hidden="true"
			on:click={() => {
				sidebarState.collapse();
			}}
		/>
		<div
			transition:fly={{ x: 300, duration: 600, opacity: 1 }}
			class="relative ml-auto flex h-full w-3/5 min-w-fit max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
		>
			<div class="flex items-center justify-between px-4">
				<h2 class="text-lg font-medium tracking-tight text-gray-900">상세 검색</h2>
				<button
					type="button"
					on:click={() => {
						sidebarState.collapse();
					}}
					class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50"
				>
					<span class="sr-only">메뉴 닫기</span>
					<!-- Heroicon name: outline/x -->
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Filters -->
			<form class="mt-4">
				<Dropdown bind:value={$selLanguage} commonProps={languageProps} />
				<Dropdown bind:value={$selTopic} commonProps={topicProps} />
				<Dropdown bind:value={$selLevel} commonProps={levelProps} />
			</form>
		</div>
	</div>
{/if}
