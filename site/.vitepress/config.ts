import { defineConfig } from "vitepress";

export default defineConfig({
  title: "L.O.R.E. — The Cairns",
  description: "A landscape of notes, reflections, jokes, and recurring ideas.",
  srcDir: "docs",
  base: "/lore-cairns/",
  cleanUrls: false,
  themeConfig: {
    nav: [
      { text: "Start Here", link: "/archive/Start%20Here.html" },
      { text: "Index", link: "/archive/index.html" },
      { text: "Leave a Stone", link: "/leave-a-stone.html" },
    ],
    search: {
      provider: "local",
    },
    outline: {
      label: "On this page",
    },
    footer: {
      message: "No required route. Wander at your own pace.",
    },
  },
});
