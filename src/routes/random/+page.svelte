<script lang="ts">
    import Button from '$lib/comps/utils/Button.svelte'
    import ButtonBox from '$lib/comps/utils/buttonBox.svelte'
    import Splash from '$lib/comps/utils/Splash.svelte'
</script>

<Splash>
    <h2>Choose Difficulty</h2>
    <ButtonBox>
        <Button url="/random/easy">Easy</Button>
        <Button url="/random/med">Medium</Button>
        <Button url="/random/hard">Hard</Button>
        <Button url="/random/expert">Expert</Button>
        <Button url="/random/mixed">Mixed</Button>
    </ButtonBox>
</Splash>
<ButtonBox>
    <Button url="/">Menu</Button>
</ButtonBox>

<style lang="scss">
</style>
