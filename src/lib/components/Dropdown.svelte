<script lang="ts">
	import { tick } from 'svelte';
	import { fly } from 'svelte/transition';

	import focusLock from 'dom-focus-lock';

	export let alignToLeft = false;
	export let allowValueReset = false;

	export let title: string;
	export let name: string;
	export let options: readonly (string | number)[];

	export let optionsEnum: { [option: string | number]: string } = undefined;
	export let optionSuffix: string = '';
	export let value: string | number = undefined;

	if (allowValueReset) options = [undefined, ...options];
	let expanded: boolean = false;

	let button: HTMLElement;
	let dropdown: HTMLElement;

	const handleDropdown = async (expand: boolean) => {
		expanded = expand;
		if (expanded) {
			await tick(); // Wait for dropdown element to be created
			focusLock.on(dropdown);
		} else {
			focusLock.off(dropdown);
			button.focus();
		}
	};
</script>

<svelte:window
	on:keydown={async (e) => {
		if (expanded && e.code === 'Escape') handleDropdown(false);
	}}
/>

<div id="menu" class="relative z-10 inline-block text-left">
	<div>
		<button
			bind:this={button}
			type="button"
			class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
			aria-expanded="false"
			on:click={() => {
				handleDropdown(!expanded);
			}}
		>
			<span>{title}</span>
			{#if value}
				<span
					class="ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700"
				>
					{optionsEnum ? optionsEnum[value] : value}
				</span>
			{/if}
			<!-- Heroicon name: solid/chevron-down -->
			<svg
				class={`-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 ${
					expanded ? 'rotate-180' : ''
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
			transition:fly={{ y: -10 }}
			class={`absolute mt-2 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ${
				alignToLeft ? 'left-0' : 'right-0'
			}`}
		>
			<form bind:this={dropdown}>
				{#each options as option (option)}
					<label
						for={`${name}-${option}`}
						class="block overflow-hidden first:rounded-t-md last:rounded-b-md"
					>
						<input
							{name}
							type="radio"
							value={option}
							id={`${name}-${option}`}
							bind:group={value}
							on:input={() => {
								handleDropdown(false);
							}}
							class="peer sr-only"
						/>
						<p
							class="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 hover:bg-indigo-50 peer-checked:bg-indigo-200 peer-checked:text-indigo-900 peer-focus:bg-indigo-200 peer-focus:text-indigo-900"
						>
							{!option ? '모두' : `${optionsEnum?.[option] || option}${optionSuffix}`}
						</p>
					</label>
				{/each}
			</form>
		</div>
	{/if}
</div>
