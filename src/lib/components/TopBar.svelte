<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let showFirstMessage = true;

	onMount(() => {
		const interval = setInterval(() => (showFirstMessage = !showFirstMessage), 12000);
		return () => clearInterval(interval);
	});
</script>

<div class="flex h-10 flex-col content-center justify-center bg-gray-900 text-sm text-white">
	{#if showFirstMessage}
		<span class="mx-auto sm:hidden" transition:slide={{ duration: 1200 }}>
			열린 책장은 <a href="http://xn--hu1b40go5ck8x.com/">두루책방</a>의 사용성을 개선한
			<a href="https://github.com/hyunbinseo/open-bookshelf#readme">프로젝트</a>입니다.
		</span>
	{:else}
		<span class="mx-auto sm:hidden" transition:slide={{ duration: 1200 }}>
			책의 저작권은 <a href="https://seeart2007.modoo.at/?link=7newq4dv">도서문화재단씨앗</a>과
			<a href="https://enuma.com/">에누마</a>에 있습니다.
		</span>
	{/if}
	<span class="mx-auto hidden sm:block">
		열린 책장은 <a href="http://xn--hu1b40go5ck8x.com/">두루책방</a>의 사용성을 개선한
		<a href="https://github.com/hyunbinseo/open-bookshelf#readme">프로젝트</a>로, 책의 저작권은
		<a href="https://seeart2007.modoo.at/?link=7newq4dv">도서문화재단씨앗</a>과
		<a href="https://enuma.com/">에누마</a>에 있습니다.
	</span>
</div>

<style>
	a {
		/* .text-indigo-200 */
		color: rgb(199 210 254);
	}
	a:hover {
		/* .text-indigo-300 */
		color: rgb(165 180 252);
	}
</style>
