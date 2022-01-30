<script lang="ts">
	import { tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	import focusLock from 'dom-focus-lock';

	import { browser } from '$app/env';

	import { sidebarExpanded, sidebarToggle } from '$lib/stores';

	let sidebar: HTMLElement;

	$: (async () => {
		if (browser) {
			if ($sidebarExpanded) {
				await tick(); // Wait for sidebar element to be created
				focusLock.on(sidebar);
			} else {
				focusLock.off(sidebar);
				$sidebarToggle.focus();
			}
		}
	})();
</script>

<svelte:window
	on:keydown={async (e) => {
		if ($sidebarExpanded && e.code === 'Escape') sidebarExpanded.set(false);
	}}
/>

{#if $sidebarExpanded}
	<div
		bind:this={sidebar}
		class="fixed inset-0 z-40 flex sm:hidden"
		role="dialog"
		aria-modal="true"
	>
		<div
			transition:fade
			class="fixed inset-0 bg-black bg-opacity-50"
			aria-hidden="true"
			on:click={() => {
				sidebarExpanded.set(false);
			}}
		/>
		<div
			transition:fly={{ x: 350, duration: 600, opacity: 1 }}
			class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
		>
			<div class="flex items-center justify-between px-4">
				<h2 class="text-lg font-medium text-gray-900">상세 검색</h2>
				<button
					type="button"
					on:click={() => {
						sidebarExpanded.set(false);
					}}
					class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
				<div class="border-t border-gray-200 px-4 py-6" />
			</form>
		</div>
	</div>
{/if}
