<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	import { downloadModalState } from '$lib/stores';

	import Item from './Item.svelte';
</script>

<div
	class="fixed inset-0 z-20 overflow-y-auto"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div
		class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
	>
		<div
			in:fade={{ easing: cubicOut }}
			out:fade={{ easing: cubicOut, duration: 500 }}
			class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
			aria-hidden="true"
			on:click={() => downloadModalState.hide()}
		/>

		<!-- This element is to trick the browser into centering the modal contents. -->
		<span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
			&#8203;
		</span>

		<div
			in:fly={{ y: 50, easing: cubicOut }}
			out:fly={{ y: 50 }}
			class="relative inline-block transform overflow-hidden rounded-lg bg-white p-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 sm:align-middle"
		>
			<h2 class="text-xl font-medium tracking-tight text-gray-900">열린 책장 기록장</h2>
			<p class="text-gray-500">이미지를 선택해 다운로드합니다.</p>
			<div class="mt-3 grid grid-cols-2 gap-x-4 sm:mt-5 sm:grid-cols-2 sm:gap-x-6">
				<Item name="숲" color="#a6cd3c" />
				<Item name="우주" color="#532089" />
			</div>
		</div>
	</div>
</div>
