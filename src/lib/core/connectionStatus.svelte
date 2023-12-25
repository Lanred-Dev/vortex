<script lang="ts">
    import { onMount } from "svelte";
    import socket from "$lib/core/socket";

    let connected: boolean = true;

    onMount(() => {
        connected = socket.connected;

        socket.on("connect", () => {
            connected = socket.connected;
        });

        socket.on("disconnect", () => {
            connected = socket.connected;
        });
    });
</script>

{#if !connected}
    <div class="absolute z-50 w-screen h-screen border-t border-backgroundSecondary bg-background flex justify-center items-center px-6 py-4">
        <p class="text-lg">Lost connection to the server.<br />Attempting to reconnect...</p>
    </div>
{/if}
