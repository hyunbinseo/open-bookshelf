<script context="module" lang="ts">
	const collapseFunctions = new Set<Function>();
	export const collapseAllDropdown = () => {
		[...collapseFunctions].forEach((fn) => {
			fn();
		});
	};
</script>

<script lang="ts">
	import { onMount, tick } from 'svelte';

	import focusLock from 'dom-focus-lock';

	import Badge from '$lib/components/MenuBar/Badge.svelte';

	import { generateOptionText } from '$lib/stories/filters';

	import type { Option, FilterProps } from '$lib/stories/filters';

	export let alignToLeft = false;
	export let value: Option = undefined;
	export let commonProps: FilterProps;

	const { allowValueReset, options, title, name } = commonProps;

	let expanded: boolean = false;

	onMount(() => {
		collapseFunctions.add(() => {
			expanded = false;
		});
	});

	let button: HTMLElement;
	let dropdown: HTMLElement;

	const handleDropdown = async (expand: boolean) => {
		if (expand) collapseAllDropdown();
		if (!expand) {
			// Remove lock before element removal
			focusLock.off(dropdown);
			button.focus();
		}

		expanded = expand;
		await tick(); // Await element creation or removal

		if (expanded) focusLock.on(dropdown);
	};

	let scrollY: number;
</script>

<svelte:window
	bind:scrollY
	on:keydown={async (e) => {
		if (expanded && e.code === 'Escape') handleDropdown(false);
	}}
/>

<div id="menu" class="relative z-10 inline-block text-left">
	<div>
		<!-- .overflow-hidden required since child icon rotates(transitions) -->
		<button
			bind:this={button}
			type="button"
			class="group inline-flex items-center justify-center overflow-hidden text-sm font-medium text-gray-700 hover:text-gray-900"
			aria-expanded={expanded}
			on:click={() => {
				handleDropdown(!expanded);
			}}
		>
			<span>{title}</span>
			<Badge {value} {commonProps} />
			<!-- Heroicon name: solid/chevron-down -->
			<svg
				class={`-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 ${
					expanded ? 'rotate-180' : 'rotate-0'
				}`}
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
		</button>
	</div>
	{#if expanded}
		<div
			class={`absolute mt-2 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 ${
				alignToLeft ? 'left-0' : 'right-0'
			}`}
		>
			<form bind:this={dropdown}>
				{#each !allowValueReset ? options : [undefined, ...options] as option (option)}
					<label
						for={`${name}-${option}`}
						class="block overflow-hidden first:rounded-t-md last:rounded-b-md"
					>
						<input
							type="radio"
							bind:group={value}
							{name}
							value={option}
							id={`${name}-${option}`}
							on:click={() => {
								handleDropdown(false);
							}}
							on:input={() => {
								scrollY = 0;
							}}
							class="peer sr-only"
						/>
						<p
							class="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 hover:bg-indigo-50 peer-checked:bg-indigo-200 peer-checked:text-indigo-900"
						>
							{generateOptionText(option, commonProps)}
						</p>
					</label>
				{/each}
			</form>
		</div>
	{/if}
</div>
