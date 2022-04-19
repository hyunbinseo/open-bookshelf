<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import { downloadModalState } from '$lib/stores';

	const subtitle = '읽고 싶은 책을 찾아볼까요?';
</script>

<Container>
	<div class="py-24 text-center tracking-tight 2xl:py-32">
		<h1 class="text-3xl text-gray-900 sm:text-2xl">
			<span class="font-medium">열린 책장</span>
			<span class="hidden sm:inline">| {subtitle}</span>
		</h1>
		<p class="mx-auto mt-4 text-base text-gray-500">
			<span class="sm:hidden">{subtitle}</span>
			<span class="hidden sm:inline">
				<button
					type="button"
					on:click={() => downloadModalState.show()}
					class="text-indigo-600 hover:text-indigo-700">기록장</button
				>에 소감을 적고 스티커를 붙이며 독서 왕에 도전해요.
			</span>
		</p>
	</div>
</Container>
