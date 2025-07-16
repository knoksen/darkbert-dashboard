import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', 'src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};

export default config;
