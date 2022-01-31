<script lang="ts">
	import { generateOptionText } from '$lib/stories/filters';

	import type { Option, FilterProps } from '$lib/stories/filters';

	export let value: Option;
	export let commonProps: FilterProps;
</script>

{#if value}
	<span
		class="ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700"
	>
		{generateOptionText(value, commonProps)}
	</span>
{/if}
