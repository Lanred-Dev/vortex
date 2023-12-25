<script lang="ts">
    export let text: string = "";
    $: words = text.split(" ").map((word: string) => word.split(""));
</script>

<div class="z-10 absolute left-0 top-0 w-full h-fit py-12 flex flex-col gap-4 justify-center items-center">
    <header class="w-full h-fit flex flex-wrap gap-x-8 gap-y-1 justify-center items-center px-14 uppercase text-3xl select-none">
        {#each words as word}
            <div class="flex items-center gap-x-2">
                {#each word as letter}
                    <p class="text-primary-700 font-black">{letter}</p>
                {/each}
            </div>
        {/each}
    </header>

    <slot />
</div>
