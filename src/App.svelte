<script>
	import * as d3 from 'd3';
	import {parseRawSalaries, YEARS} from './utils';
	import Circle  from "./Circle.svelte";
	import colors from './team_colors.js';

	let key;
	let keyCode;


	let width = 1000;
	let height = 1000;
	let value = YEARS[0];

	let data;
	let sizeScale;

	function handleKeydown(event) {
		key = event.key;
		keyCode = event.keyCode;
		if (keyCode === 32){
			let index = YEARS.indexOf(value);
			if(index < 0 || index+1 === YEARS.length){
				value = YEARS[0]
			}else {
				value = YEARS[index + 1]
			}

		}

	}


	let createCircles = function(datum, year) {

		sizeScale = d3.scaleLinear()
			.domain(d3.extent(datum, d => d[year]))
            .range([0, 50]);

		const newData = datum.map(d => {
			d.r = sizeScale(d[year])
			return d
		})
		const group = d3.group(newData, (d) => d.Tm);
		const root = d3.hierarchy(group).sum(function (d) {
				return d.r ? d.r : 0;
				})

		const pack = d3.pack()
      			.size([width, height])
				.padding(5)
    				(root);
		
		return pack;
		 
    }
	

	d3.csv('/data/salaries.csv',parseRawSalaries
	).then(function(d) {
		data = d
		createCircles(data, value).leaves() 
	})
</script>
<svelte:window on:keydown={handleKeydown}/>
<main>
	<h1>NBA</h1>
	<select bind:value>
		{#each YEARS as item}
			<option value={item}>{item}</option> 
		{/each}
	</select>
	<svg width={width} height={height}>
	{#if data}
		{#each createCircles(data, value).leaves() as circle, i}
			<Circle colors={colors[circle.data.Tm]} cx={circle.x} cy={circle.y} r={circle.r} />
		{/each}
	{/if}
	</svg>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

</style>