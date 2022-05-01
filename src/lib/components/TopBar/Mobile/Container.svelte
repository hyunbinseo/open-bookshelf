<script lang="ts">
	import { slide } from 'svelte/transition';
</script>

<span class="mx-auto sm:hidden" transition:slide={{ duration: 1200 }}>
	<slot />
</span>
