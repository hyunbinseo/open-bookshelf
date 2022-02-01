<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	export let heading: string;
	export let paragraph: string;
</script>

<Container>
	<div class="py-24 text-center">
		<h1 class="text-4xl font-extrabold tracking-tight text-gray-900">{heading}</h1>
		<p class="mx-auto mt-4 max-w-3xl text-base text-gray-500">{paragraph}</p>
	</div>
</Container>
