<script lang="ts">
	import { onMount } from 'svelte';

	import About from './Mobile/About.svelte';
	import Copyright from './Mobile/Copyright.svelte';
	import Download from './Mobile/Download.svelte';

	const mobileComponents = [About, Copyright, Download];
	const mobileComponentsCount = mobileComponents.length;

	let mobileIndex = 0;

	const incrementMobileIndex = () => (mobileIndex = (mobileIndex + 1) % mobileComponentsCount);

	onMount(() => {
		const interval = setInterval(incrementMobileIndex, 12000);
		return () => clearInterval(interval);
	});
</script>

<div class="flex h-12 flex-col content-center justify-center bg-gray-900 text-sm text-white">
	<svelte:component this={mobileComponents[mobileIndex]} />
	<span class="mx-auto hidden sm:block">
		열린 책장은 <a href="http://xn--hu1b40go5ck8x.com/">두루책방</a>의 사용성을 개선한
		<a href="https://github.com/hyunbinseo/open-bookshelf#readme">프로젝트</a>로, 책의 저작권은
		<a href="https://seeart2007.modoo.at/?link=7newq4dv">도서문화재단씨앗</a>과
		<a href="https://enuma.com/">에누마</a>에 있습니다.
	</span>
</div>

<!-- Reference https://github.com/sveltejs/svelte/issues/4843 -->
<style>
	:global(a, button) {
		/* .text-indigo-200 */
		color: rgb(199 210 254);
	}

	:global(a:hover, button:hover) {
		/* .text-indigo-300 */
		color: rgb(165 180 252);
	}
</style>
