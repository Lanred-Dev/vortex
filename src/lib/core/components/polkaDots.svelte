<script lang="ts">
    import { onMount } from "svelte";

    export let classes: string = "";
    const dotSize: number = 2;
    const dotSpacing: number = 25;
    let canvas: HTMLCanvasElement;
    let canvasContext: CanvasRenderingContext2D;
    let xDots: number;
    let yDots: number;

    function renderDots() {
        canvasContext.fillStyle = "#141414";
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        for (let x: number = 0; x < xDots; x++) {
            for (let y: number = 0; y < yDots; y++) {
                canvasContext.fillRect(dotSpacing * x, dotSpacing * y, dotSize, dotSize);
            }
        }
    }

    function render() {
        canvas.width = canvas.clientWidth * 2;
        canvas.height = canvas.clientHeight * 2;
        xDots = canvas.width / dotSpacing;
        yDots = canvas.height / dotSpacing;
        renderDots();
    }

    onMount(() => {
        canvasContext = canvas.getContext("2d")!;

        render();
        window.addEventListener("resize", render);
    });
</script>

<canvas class={classes} bind:this={canvas} />
