<script lang="ts">
	import Container from '$lib/components/Container.svelte';
</script>

<footer aria-labelledby="footer-heading" class="border-t border-gray-200 bg-white">
	<Container>
		<h2 id="footer-heading" class="sr-only">꼬리말</h2>
		<div class="mx-auto">
			<div class="border-t border-gray-100 py-10 text-center">
				<p class="text-sm text-gray-500">
					<slot />
				</p>
			</div>
		</div>
	</Container>
</footer>
