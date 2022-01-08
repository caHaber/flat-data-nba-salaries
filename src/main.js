import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    name: "NBA Salaries",
  },
});

export default app;
