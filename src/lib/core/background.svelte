<script lang="ts">
    import PolkaDots from "$lib/core/components/polkaDots.svelte";
    import anime from "animejs";
    import { onMount } from "svelte";
    import { backgroundColor } from "$lib/stores/core";
    import { get } from "svelte/store";

    let backgroundColorContainer: HTMLDivElement;
    let backgroundColorTransitionContainer: HTMLDivElement;

    onMount(() => {
        backgroundColor.subscribe((newColor: string) => {
            backgroundColorTransitionContainer.style.display = "block";
            backgroundColorTransitionContainer.style.backgroundColor = newColor;

            anime({
                targets: backgroundColorTransitionContainer,
                top: ["-100%", "0%"],
                duration: 800,
                easing: "easeOutQuad",
                complete: () => {
                    backgroundColorContainer.style.backgroundColor = newColor;
                    backgroundColorTransitionContainer.style.display = "none";
                },
            });
        });
    });
</script>

<svelte:head>
    <title>Vortex</title>
</svelte:head>

<div class="absolute w-screen h-screen z-[1]" style="background-color: {get(backgroundColor)};" bind:this={backgroundColorContainer} />
<div class="hidden absolute w-screen h-screen z-[2]" bind:this={backgroundColorTransitionContainer} />
<PolkaDots classes="absolute w-screen h-screen z-[3] bg-transparent" />
