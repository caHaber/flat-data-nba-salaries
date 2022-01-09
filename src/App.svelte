<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { parseRawSalaries, YEARS } from "./utils";
  import Circle from "./Circle.svelte";
  import colors from "./team_colors.js";
  import { writable } from "svelte/store";

  let keyCode;
  let svg;

  let width = 1000;
  let height = 1000;
  let value = YEARS[0];

  let data;
  let sizeScale;
  let zoomTransform = writable({ k: 1, x: 0, y: 0 });

  function handleKeydown(event) {
    keyCode = event.keyCode;
    if (keyCode === 32) {
      let index = YEARS.indexOf(value);
      if (index < 0 || index + 1 === YEARS.length) {
        value = YEARS[0];
      } else {
        value = YEARS[index + 1];
      }
    }
  }

  let createCircles = function (datum, year) {
    sizeScale = d3
      .scaleLinear()
      .domain(d3.extent(datum, (d) => d[year]))
      .range([0, 50]);

    const newData = datum
      .map((d) => {
        d.r = sizeScale(d[year]);
        return d;
      })
      .filter((d) => d.r > 0);
    const group = d3.group(newData, (d) => d.Tm);
    const root = d3.hierarchy(group).sum(function (d) {
      return d.r ? d.r : 0;
    });

    const pack = d3.pack().size([width, height]).padding(5)(root);

    return pack;
  };

  onMount(async () => {
    data = await d3.csv("/data/salaries.csv", parseRawSalaries);
  });
</script>

<svelte:window on:keydown={handleKeydown} />
<main>
  <div class="header">
    <h1>NBA Salaries</h1>
    <select bind:value>
      {#each YEARS as item}
        <option value={item}>{item}</option>
      {/each}
    </select>
  </div>
  <svg viewBox="0,0,{width},{height}" bind:this={svg} {width} {height}>
    <g
      id="container"
      transform="scale({$zoomTransform.k}) translate({$zoomTransform.x},{$zoomTransform.y})"
    >
      {#if data}
        {#each createCircles(data, value).leaves() as circle, i}
          <Circle
            data={circle.data}
            colors={colors[circle.data.Tm]}
            cx={circle.x}
            cy={circle.y}
            r={circle.r}
          />
        {/each}
      {/if}
    </g>
  </svg>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
