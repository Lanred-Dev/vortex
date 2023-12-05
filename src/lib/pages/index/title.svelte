<script lang="ts">
    import { backgroundColor } from "$lib/background";

    function navigate() {
        backgroundColor.set("#555555")
    }
</script>

<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl gap-28 select-none flex children:opacity-50 hover:children:opacity-100 children:transition-all children:duration-300 children:ease-in-out">
    <button on:click={navigate}>V</button>
    <button>O</button>
    <button>R</button>
    <button>T</button>
    <button>E</button>
    <button>X</button>
</div>

<style>
    div button {
        text-shadow: 0px 0px 0px rgb(30 58 138);
    }

    div button:hover {
        text-shadow: 0px 0px 100px rgb(30 58 138);
    }
</style>
