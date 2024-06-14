<script lang="ts">
    import Header from "$lib/core/components/header.svelte";
    import Stars from "$lib/core/components/stars.svelte";
    import { onMount } from "svelte";
    import socket from "$lib/core/socket";
    import { code } from "$lib/stores/lobby";
    import type { player } from "$lib/core/types";

    let playerCount: number;
    let maxPlayers: number;

    onMount(() => {
        socket.emit("lobby:getPlayers", (newPlayerCount: number, newMaxPlayers: number) => {
            playerCount = newPlayerCount;
            maxPlayers = newMaxPlayers;
        });

        socket.on("player:join", (player: player, newPlayerCount: number) => {
            playerCount = newPlayerCount;
        });

        socket.on("player:leave", (username: string, newPlayerCount: number) => {
            playerCount = newPlayerCount;
        });

        return () => {
            socket.removeListener("lobby:playerJoin");
        };
    });
</script>

<Header text="{playerCount}/{maxPlayers} players">
    <p class="flex gap-2 uppercase text-primary-700 font-black text-2xl items-center tracking-widest">
        <svg class="fill-[rgb(199,199,199)] w-9 aspect-square" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z" clip-rule="evenodd" />
        </svg>
        
        {$code}
    </p>
</Header>

<Stars classes="w-full h-full bg-black absolute top-0 left-0 z-[0]" />
