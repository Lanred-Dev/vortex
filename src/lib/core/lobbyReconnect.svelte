<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import socket from "./socket";
    import { getStateFromStorage, resetStorageState, saveState } from "$lib/stores/lobby";

    let promptForReconnect: boolean = false;
    let host: boolean;
    let token: string;
    let code: string;
    let username: string;

    function reconnect(shouldReconnect: boolean) {
        if (shouldReconnect) {
            socket.emit("player:join", host, code, host ? token : username, () => {
                saveState(host, token, code, username);
                goto("/game");
            });
        }

        promptForReconnect = false;
    }

    onMount(() => {
        const state = getStateFromStorage();
        host = state.host as boolean;
        token = state.token as string;
        code = state.code as string;
        username = state.username as string;

        if (code.length === 4 && (username.length > 0 || (host && token.length > 0))) {
            socket.emit("lobby:validateCode", code, (valid: boolean) => {
                promptForReconnect = valid;

                // If its not valid remove then reset local storage. As it can be confirmed that it is not valid.
                if (!valid) resetStorageState();
            });
        }
    });
</script>

{#if promptForReconnect}
    <div class="form absolute z-40 w-screen h-screen border-t border-backgroundSecondary bg-background flex flex-col gap-2 justify-center items-center px-6 py-4">
        <p class="text-lg max-w-[480px]">It appears that you were already in a game.<br />Would you like to reconnect to <span class="font-semibold">{code}</span> as <span class="font-semibold">{host ? "the host" : username}</span>?</p>

        <div class="flex gap-2 w-full max-w-[480px]">
            <button
                on:click={() => {
                    reconnect(true);
                }}>Yes</button
            >

            <button
                class="!bg-red-700"
                on:click={() => {
                    reconnect(false);
                }}>No</button
            >
        </div>
    </div>
{/if}
