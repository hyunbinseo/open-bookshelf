<script lang="ts">
	export let isFullHeight = false;
</script>

<div
	class={`mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 2xl:max-w-screen-2xl ${
		isFullHeight ? 'h-full' : ''
	}`}
>
	<slot />
</div>
