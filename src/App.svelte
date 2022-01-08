<script>
	import * as d3 from 'd3';
	import {parseRawSalaries} from './utils';
	
	let data;
	d3.csv('/data/salaries.csv').then(function(d) {
		console.log(d[0])
		data = d
	})
</script>

<main>
	<h1>{data}</h1>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

</style>