<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import { downloadModalToggleEl, downloadModalState } from '$lib/stores';

	const subtitle = '읽고 싶은 책을 찾아볼까요?';
</script>

<Container>
	<div class="py-24 text-center tracking-tight 2xl:py-32">
		<h1 class="text-3xl font-medium text-gray-900 sm:text-2xl">
			열린 책장<span class="hidden font-normal sm:inline">에서 {subtitle}</span>
		</h1>
		<p class="mx-auto mt-4 text-base tracking-tight text-gray-500">
			<span class="sm:hidden">{subtitle}</span>
			<span class="hidden sm:inline">
				<button
					type="button"
					bind:this={$downloadModalToggleEl}
					on:click={() => downloadModalState.show()}
					class="text-indigo-600 hover:text-indigo-700">독서 기록장을 다운로드해</button
				> 독서왕에 도전해 봐요!
			</span>
		</p>
	</div>
</Container>
