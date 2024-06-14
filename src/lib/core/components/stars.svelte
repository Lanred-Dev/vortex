<script lang="ts">
    import sparticles from "@lanred/sparticles";
    import { onMount } from "svelte";

    export let classes: string;
    export let starCount: number = 275;
    export let parallax: number = 5;
    let canvas: HTMLCanvasElement;
    let stars: any;

    function resize() {
        stars.setCanvasSize(window.innerWidth, window.innerHeight);
        stars.resetSparticles();
    }

    onMount(() => {
        stars = new sparticles(canvas, {
            composition: "source-over",
            count: starCount,
            speed: 0.15,
            parallax: parallax,
            direction: 300,
            xVariance: 2,
            yVariance: 2,
            rotate: false,
            rotation: 1,
            alphaSpeed: 36,
            alphaVariance: 0.1,
            minAlpha: 0,
            maxAlpha: 1,
            minSize: 6,
            maxSize: 17,
            style: "fill",
            bounce: false,
            drift: 1,
            glow: 50,
            twinkle: false,
            color: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#6081FF", "#FFBF00"],
            shape: "circle",
            imageUrl: "",
        });

        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
            stars.destroy();
        };
    });
</script>

<canvas class={classes} bind:this={canvas} />
