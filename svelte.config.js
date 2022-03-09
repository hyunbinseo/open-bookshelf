import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    /*
     * Inline all stylesheets smaller than 1kb
     * Reference https://github.com/sveltejs/kit/issues/962#issuecomment-1010413860
     */
    inlineStyleThreshold: 1024,
    prerender: {
      default: true,
    },
  },
};

export default config;
