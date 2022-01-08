<script>
  export let cx;
  export let cy;
  export let r;
  export let colors;
  export let data;
  import { beforeUpdate } from "svelte";
  import { spring } from "svelte/motion";
  import PlayerLabel from "./PlayerLabel.svelte";

  let circleData = spring({ cx, cy, r });

  beforeUpdate(() => {
    circleData.set({ cx, cy, r });
  });
</script>

<g transform={`translate(${$circleData.cx},${$circleData.cy})`}>
  <circle
    fill={colors.mainColor}
    stroke-width={($circleData.r / 50) * 10}
    stroke={colors.secondaryColor}
    r={$circleData.r}
  />
  <PlayerLabel name={data.Player} size={4} height={$circleData.r * 2} />
</g>

<style>
</style>
