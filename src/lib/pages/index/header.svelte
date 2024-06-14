<script lang="ts">
    const letters: string[] = "vortex".split("");
</script>

<header class="z-10 absolute left-0 top-0 w-full h-fit py-12 flex justify-between items-center px-14">
    {#each letters as letter}
        <p class="uppercase text-3xl font-black text-opacity-90 select-none">{letter}</p>
    {/each}
</header>
