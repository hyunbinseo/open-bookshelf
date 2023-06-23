<script lang="ts">
	import type { FilterProps, Option } from '$lib/stories/filters';
	import { generateOptionText } from '$lib/stories/filters';

	export let value: Option;
	export let commonProps: FilterProps;
</script>

{#if value}
	<span class="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs tabular-nums text-gray-700">
		{generateOptionText(value, commonProps)}
	</span>
{/if}
