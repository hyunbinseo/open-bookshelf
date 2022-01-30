<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { sineOut } from 'svelte/easing';

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
</script>

<div id="menu" class="relative inline-block text-left">
	<div>
		<button
			type="button"
			class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
			aria-expanded="false"
			on:click={() => {
				expanded = !expanded;
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
			transition:fade={{ duration: 300, easing: sineOut }}
			class="fixed inset-0 z-10 bg-gray-500 bg-opacity-50 transition-opacity"
			aria-hidden="true"
			on:click={() => {
				expanded = false;
			}}
		/>
		<div
			transition:fly={{ y: -10 }}
			class={`absolute z-20 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ${
				alignToLeft ? 'left-0' : 'right-0'
			}`}
		>
			<form class="space-y-4">
				{#each options as option (option)}
					<div class="flex items-center">
						<input
							{name}
							type="radio"
							value={option}
							id={`${name}-${option}`}
							bind:group={value}
							on:input={() => {
								expanded = false;
							}}
							class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<label
							for={`${name}-${option}`}
							class="ml-3 whitespace-nowrap pr-1 text-sm font-medium text-gray-900"
						>
							{!option ? '모두' : `${optionsEnum?.[option] || option}${optionSuffix}`}
						</label>
					</div>
				{/each}
			</form>
		</div>
	{/if}
</div>
