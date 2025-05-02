<script lang="ts">
    import { page } from '$app/state'

    let home = $state(true)
    $effect(() => {
        home = page.route.id == '/'
    })
</script>

<h1 class:notHome={!home}>TurtleTurtle</h1>

<style lang="scss">
    h1 {
        font-family: 'Intro Script';
        font-size: calc(1.2 * var(--font-size-xxxl));
        -webkit-text-stroke: calc(0.5 * var(--padding)) var(--white);
        color: var(--green);
        paint-order: stroke fill;
        text-shadow: var(--shadowS);
        transition: flex-grow var(--animationTime) ease;


    }
</style>
