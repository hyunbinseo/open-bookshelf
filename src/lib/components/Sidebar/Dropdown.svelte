<script context="module" lang="ts">
	const collapseFunctions = new Set<Function>();
	const collapseAllDropdown = () => {
		[...collapseFunctions].forEach((fn) => {
			fn();
		});
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { slide, fade } from 'svelte/transition';

	import { generateOptionText } from '$lib/stories/filters';

	import type { Option, FilterProps } from '$lib/stories/filters';

	// Value prop - binds with store
	export let value: Option = undefined;

	// Common prop
	export let commonProps: FilterProps;

	const { allowValueReset, options, title, name } = commonProps;

	let expanded: boolean = false;

	onMount(() => {
		collapseFunctions.add(() => {
			expanded = false;
		});
	});
</script>

<div class="border-t border-gray-200 px-4 py-6">
	<h3 class="-mx-2 -my-3 flow-root">
		<button
			type="button"
			class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400"
			aria-controls="filter-section-0"
			aria-expanded="false"
			on:click={() => {
				const isExpanded = expanded;
				collapseAllDropdown();
				expanded = !isExpanded;
			}}
		>
			<span class="font-medium text-gray-900">
				{title}
				{#if !expanded}
					<span in:fade class="pl-3 text-gray-500">
						{generateOptionText(value, commonProps)}
					</span>
				{/if}
			</span>
			<span class="ml-6 flex items-center">
				<!-- Heroicon name: solid/chevron-down -->
				<svg
					class={`h-5 w-5 transform transition-transform ${expanded ? 'rotate-180' : 'rotate-0'}`}
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</button>
	</h3>
	{#if expanded}
		<div class="pt-6" transition:slide|local>
			<div class="space-y-6">
				{#each !allowValueReset ? options : [undefined, ...options] as option (option)}
					<div class="flex items-center">
						<input
							type="radio"
							bind:group={value}
							name={`${name}-@sidebar`}
							value={option}
							id={`${name}-${option}-@sidebar`}
							on:click={() => {
								expanded = false;
							}}
							on:input={() => {
								window.scrollTo(0, 0);
							}}
							class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<label for={`${name}-${option}-@sidebar`} class="ml-3 text-sm text-gray-500">
							{generateOptionText(option, commonProps)}
						</label>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
