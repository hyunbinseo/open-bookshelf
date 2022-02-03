module.exports = {
  content: ['./src/app.html', './src/**/*.{svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
