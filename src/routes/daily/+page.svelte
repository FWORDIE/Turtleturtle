<script lang="ts">
    import Board from '$lib/comps/utils/board.svelte'
    import Button from '$lib/comps/utils/Button.svelte'
    import ButtonBox from '$lib/comps/utils/buttonBox.svelte'
    import Splash from '$lib/comps/utils/Splash.svelte'
    import type { PageData } from './$types'

    let { data }: { data: PageData } = $props()
</script>

<Splash>
    <h2>Hint</h2>
    <p>
        Every Turtle has a unique pattern of scales around their heads. Like
        human fingerprints, these never change. So try looking for unique
        features or patterns that are shared between turtles!
    </p>
    <p>
        Every game has 4 pairs of images of a turtle, ranging from easy to very
        hard, and 1 unique image that will be left over at the end.
    </p>
    <p>
        Every Turtle has a unique pattern of scales around their heads. Like
        human fingerprints, these never change. So try looking for unique
        features or patterns that are shared between turtles!
    </p>
    <p>
        Every game has 4 pairs of images of a turtle, ranging from easy to very
        hard, and 1 unique image that will be left over at the end.
    </p>
    <p>
        Every Turtle has a unique pattern of scales around their heads. Like
        human fingerprints, these never change. So try looking for unique
        features or patterns that are shared between turtles!
    </p>
    <p>
        Every game has 4 pairs of images of a turtle, ranging from easy to very
        hard, and 1 unique image that will be left over at the end.
    </p>
    <p>
        Every Turtle has a unique pattern of scales around their heads. Like
        human fingerprints, these never change. So try looking for unique
        features or patterns that are shared between turtles!
    </p>
    <p>
        Every game has 4 pairs of images of a turtle, ranging from easy to very
        hard, and 1 unique image that will be left over at the end.
    </p><p>
        Every game has 4 pairs of images of a turtle, ranging from easy to very
        hard, and 1 unique image that will be left over at the end.
    </p>
    <p>
        Every Turtle has a unique pattern of scales around their heads. Like
        human fingerprints, these never change. So try looking for unique
        features or patterns that are shared between turtles!
    </p>
    <p>
        Every game has 4 pairs of images of a turtle, ranging from easy to very
        hard, and 1 unique image that will be left over at the end.
    </p>
    <ButtonBox>
        <Button url="/" style="orange">Home!</Button>
    </ButtonBox>
</Splash>
