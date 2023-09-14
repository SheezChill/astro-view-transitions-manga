import { defineConfig, presetUno } from "unocss";
import transformerDirectives from "@unocss/transformer-directives";

const colors = {
  testing: {
    light: "red",
    dark: "blue",
  },
  // "gradient-from": {
  //   light: "#fff",
  //   dark: "#121212",
  // },
  // "gradient-to": {
  //   light: "#121212",
  //   dark: "#fff",
  // },
};

export default defineConfig({
  content: {
    filesystem: ["**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}"],
  },
  presets: [presetUno()],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      button:
        "linear-gradient(to bottom, var(--un-th-gradient-from), var(--un-th-gradient-to))",
      ...Object.keys(colors).reduce((acc: Record<string, string>, key) => {
        acc[key] = `var(--un-th-${key})`;
        return acc;
      }, {}),
    },
  },
  preflights: [
    {
      getCSS: () => `
        :root { 
          ${Object.entries(colors).reduce(
            (acc, en) => (acc += `--un-th-${en[0]}:${en[1].light};`),
            ""
          )} 
        }  
        .dark { 
          ${Object.entries(colors).reduce(
            (acc, en) => (acc += `--un-th-${en[0]}:${en[1].dark};`),
            ""
          )} 
        }
      `,
    },
  ],
});
