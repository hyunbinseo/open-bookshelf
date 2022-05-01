<script lang="ts">
	import { downloadModalToggleEl, downloadModalState } from '$lib/stores';

	import Container from './Container.svelte';
</script>

<Container>
	<button
		type="button"
		bind:this={$downloadModalToggleEl}
		on:click={() => downloadModalState.show()}>독서 기록장을 다운로드해</button
	> 내역을 기록할 수 있습니다.
</Container>
