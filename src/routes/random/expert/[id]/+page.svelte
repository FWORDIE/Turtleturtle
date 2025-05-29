<script lang="ts">
    import GameBoard from '$lib/comps/gameBoard.svelte'
    import type { PageData } from './$types'

    let { data }: { data: PageData } = $props()
</script>

{#key data.images}
<GameBoard images={data.images} rawIds={data.rawIds}></GameBoard>
{/key}
