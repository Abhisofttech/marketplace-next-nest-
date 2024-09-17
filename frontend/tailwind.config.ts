import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'signup-bg': "url('https://img.freepik.com/premium-photo/cartoon-character-images-background_1179130-657729.jpg?w=740')",
      },
    },
  },
  plugins: [],
};
export default config;
