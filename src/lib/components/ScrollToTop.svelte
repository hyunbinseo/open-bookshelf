<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<div transition:fly={{ y: 50 }} class="sticky bottom-10 mx-auto">
	<button
		type="button"
		class="inline-flex items-center rounded-full border border-transparent bg-gray-600 p-3 text-white transition duration-300 hover:bg-gray-700"
		style="box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;"
		on:click={() => {
			window.scroll({ top: 0 });
		}}
	>
		<!-- Heroicon name: outline/chevron-up -->
		<svg
			class="h-6 w-6"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
		</svg>
	</button>
</div>
