<script lang="ts">
    import GameBoard from '$lib/comps/gameBoard.svelte'
    import type { PageData } from './$types'

    let { data }: { data: PageData } = $props()
</script>

{#key data.rawIds}
<GameBoard images={data.images}></GameBoard>
{/key}
