<!-- const CircleLabel = ({name,r}) => {
	let size = '.9em',
		height = 15;
	if(r < 29){
		size = '.7em';
		height = 10
	}

 return ()
} -->
<script>
  export let height;
  export let size;
  export let name;
</script>

<text x="0" y="0" dy="0" font-size={size}>
  {#each name.split(" ") as d, i}
    <tspan key={i} x={0} dy={i * height}>{d}</tspan>
  {/each}
</text>

<style>
</style>
