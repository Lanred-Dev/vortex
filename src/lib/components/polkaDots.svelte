<script lang="ts">
    import { onMount } from "svelte";

    export let classes: string = "";
    const dotSize: number = 2;
    const dotSpacing: number = 25;
    let canvas: HTMLCanvasElement;
    let canvasContext: CanvasRenderingContext2D;
    let xDots: number;
    let yDots: number;
    let animtionLoop: NodeJS.Timeout;
    let currentAnimtionX: number = 0;
    let lastUpdate: number = 0;

    function renderDots() {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        let lastYInSet: number = 0;

        for (let x: number = 0; x < xDots; x++) {
            for (let y: number = 0; y < yDots; y++) {
                let size: number = dotSize;

                if (x <= currentAnimtionX && y == lastYInSet++) {
                    lastYInSet = y;
                    canvasContext.fillStyle = "#fff";
                    size = (dotSize + 0.5 * ((Date.now() - lastUpdate) / Date.now()));
                } else {
                    canvasContext.fillStyle = "#141414";
                }

                canvasContext.fillRect(dotSpacing * x, dotSpacing * y, size, size);
            }
        }
    }

    function render() {
        canvas.width = canvas.clientWidth * 2;
        canvas.height = canvas.clientHeight * 2;
        xDots = canvas.width / dotSpacing;
        yDots = canvas.height / dotSpacing;

        renderDots();

        currentAnimtionX = 0;
        clearInterval(animtionLoop);
        animtionLoop = setInterval(() => {
            requestAnimationFrame(() => {
                console.log(Date.now() - lastUpdate)
                if (Date.now() - lastUpdate >= 100) {
                    lastUpdate = Date.now();

                    if (currentAnimtionX > xDots) {
                        currentAnimtionX = 1;
                    } else {
                        currentAnimtionX += 1;
                    }
                }

                renderDots();
            });
        }, 1000);
    }

    onMount(() => {
        canvasContext = canvas.getContext("2d")!;

        render();
        window.addEventListener("resize", render);
    });
</script>

<canvas class={classes} bind:this={canvas} />
