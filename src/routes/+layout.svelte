<script lang="ts">
    import { page } from '$app/state'
    import Background from '$lib/comps/background.svelte'
    import Title from '$lib/comps/utils/title.svelte'
    import '$lib/scss/global.scss'
    import { animationTime, cheat } from '$lib/store'

    let { children } = $props()

    // Tag
    console.log(
        '%c * Made by Fred Wordie, Say hi if it dont work * ',
        'background: #f4f1e6; color: #115545; padding: 10px 20px; line-height:100px; '
    )

    // Checks which page we are on to control animation
    let home = $state(true)
    $effect(() => {
        home = page.route.id == '/'
    })

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key == 'C') {
            $cheat  = !$cheat
        }
        console.log(e.key)
    }
</script>

<svelte:window onkeydown={(event) => handleKeyDown(event)} />
<Background {home}></Background>

<!-- Main Game Body -->
<!-- Set CSS variable for animations -->
<main style="--animationTime: {$animationTime}ms;">
    <div class="content">
        <Title></Title>
        <div class="items" class:notHome={!home}>
            {@render children()}
        </div>
        <!-- Spacer allows for flex aniamitons between pages -->
        <!-- <div class="spacer" class:notHome={!home}></div> -->
        <!-- Slot for pages -->
    </div>
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
        padding: var(--padding);
        align-items: center;
        justify-content: center;
        min-height: 100dvh;
        padding: var(--extraLargePadding);
        transition: flex var(--animationTime) ease;
        width: 100%;
        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding-bottom: calc(4 * var(--padding));
            transition: flex var(--animationTime) ease;
        }
        .items {
            transition: flex-grow var(--animationTime) ease;
            flex-grow: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 500px;

            &.notHome {
                flex-grow: 1;
            }
        }
    }
</style>
