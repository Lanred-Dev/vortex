<script lang="ts">
    import "@splidejs/svelte-splide/css/core";
    import "$lib/components/tailwind.css";
    import PolkaDots from "$lib/components/polkaDots.svelte";
    import anime from "animejs";
    import { onMount } from "svelte";
    import { backgroundColor } from "$lib/background";
    import { get } from "svelte/store";

    let heightScreenElements: HTMLElement[];
    let classRegex: RegExp = /(lg|sm|md)\:h\-/gm;
    let selectorRegex: RegExp = /(lg|sm|md)/gm;
    let backgroundColorContainer: HTMLDivElement;
    let backgroundColorTransitionContainer: HTMLDivElement;

    //prevent elements with sm, md, or lg selectors from being overwritten depending on screen size
    function checkIfSelectorMatch(element: HTMLElement): boolean {
        const classMatches: any = classRegex.exec(element.classList.toString());

        if (classMatches === null) return false;

        let result: boolean = false;

        //we found matches now check if they are being used
        classMatches.forEach((string: string) => {
            const selectorMatches: any = selectorRegex.exec(string);

            //if no matches from the selector regex are found then return
            if (selectorMatches === null) {
                result = result === true ? true : false;
                return;
            }

            //check with based on selector
            switch (selectorMatches[0]) {
                case "lg":
                    result = window.innerWidth > 1024;
                    break;
                case "md":
                    result = window.innerWidth > 768;
                    break;
                case "sm":
                    result = window.innerWidth > 640;
                    break;
            }
        });

        return result;
    }

    //fixes bug on IOS where the viewport space is bigger than the innerHeight
    function updateHeightElements() {
        heightScreenElements = Array.from(document.querySelectorAll(".h-screen") as unknown as HTMLCollectionOf<HTMLElement>);

        heightScreenElements.forEach((element: HTMLElement) => {
            //check to make sure that size should be set
            if (checkIfSelectorMatch(element) === true) {
                element.style.height = null as any;
                return;
            }

            element.style.height = `${window.innerHeight}px`;
        });
    }

    onMount(() => {
        updateHeightElements();
        window.addEventListener("resize", updateHeightElements);

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

<main class="h-screen w-screen select-text overflow-hidden text-center">
    <div>
        <div class="absolute w-screen h-screen z-[1]" style="background-color: {get(backgroundColor)};" bind:this={backgroundColorContainer} />
        <div class="hidden absolute w-screen h-screen z-[2]" bind:this={backgroundColorTransitionContainer} />
        <PolkaDots classes="absolute w-screen h-screen z-[3] bg-transparent" />
    </div>

    <div class="h-screen w-screen absolute top-0 left-0 z-[4] overflow-x-hidden">
        <slot />
    </div>
</main>
