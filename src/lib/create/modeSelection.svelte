<script lang="ts">
    import Stars from "$lib/core/components/stars.svelte";
    import type { mode } from "$lib/core/types";

    export let modes: mode[];
    export let callback: (mode: mode) => void;
    let currentIndex: number = 0;

    function skipToIndex(index: number) {
        currentIndex = index;
    }
</script>

<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-6 w-full">
    <div class="buttonGrid w-full">
        {#each modes as mode, index}
            <button
                on:click={() => {
                    callback(mode);
                }}
                class="flex-col justify-center items-start !py-8 !px-8 h-fit w-fit text-left !aspect-auto overflow-hidden {currentIndex === index ? 'flex' : 'hidden'} {mode.cardTheme === 'space' ? '!border-blue-600' : ''}"
            >
                <p class="uppercase text-3xl font-black mb-1 tracking-[0.5rem]">{mode.title}</p>

                <p class="flex font-semibold gap-1 mb-3">
                    <svg class="fill-white aspect-square w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-slot="icon">
                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                    </svg>
                    {mode.minPlayers}-{mode.maxPlayers}
                </p>

                <p class="text-primary-700 text-base">{mode.description}</p>

                {#if mode.cardTheme === "space"}
                    <Stars classes="w-full h-full absolute top-0 left-0 z-[-1] bg-transparent" parallax={0.8} starCount={15} />
                {/if}
            </button>
        {/each}
    </div>

    {#if modes.length > 1}
        <div class="flex justify-center items-center w-fit rounded-full overflow-hidden gap-0.5">
            {#each modes as _mode, index}
                <button
                    on:click={() => {
                        skipToIndex(index);
                    }}
                    class="bg-white {currentIndex === index ? 'bg-opacity-100 shadow-white' : 'bg-opacity-50 shadow-transparent'} w-14 h-3.5 shadow-xl transition-colors duration-200"
                />
            {/each}
        </div>
    {/if}
</div>
