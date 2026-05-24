import type { Preview } from "@storybook/react";
import "@bss-ds/tokens/tokens.css";
import "@bss-ds/tokens/fonts.css";
import "@bss-ds/ui/styles.css";
import "@bss-ds/recipes/styles.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "canvas",
      values: [
        { name: "canvas", value: "#FFFFFF" },
        { name: "light-grey", value: "#ECF0F3" },
        { name: "primary", value: "#006CB7" },
        { name: "dark-blue", value: "#26257C" },
        { name: "ink-deep", value: "#0A1E33" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
