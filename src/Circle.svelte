<script>


    export let cx;
    export let cy;
    export let r;
    export let colors;
    import { beforeUpdate } from 'svelte';
    import {spring} from 'svelte/motion'


    let circleData = spring({cx, cy, r});


    beforeUpdate(() => {
        circleData.set({cx, cy, r})
    });
    
</script>

    <circle fill={colors.mainColor} stroke-width={$circleData.r / 50 * 10} stroke={colors.secondaryColor} cx={$circleData.cx} cy={$circleData.cy} r={$circleData.r}/>
<style>

</style>
