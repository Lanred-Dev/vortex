<script lang="ts">
    import VortexHost from "$lib/game/vortex/host/index.svelte";
    import VortexPlayer from "$lib/game/vortex/player/index.svelte";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";
    import socket from "$lib/core/socket";
    import { host as hostStore, token as tokenStore, code as codeStore, username as usernameStore, resetStorageState, saveState } from "$lib/stores/lobby";

    let host: boolean;
    let token: string;
    let code: string;
    let username: string;
    let mode: string;

    onMount(() => {
        host = get(hostStore);
        token = get(tokenStore);
        code = get(codeStore);
        username = get(usernameStore);

        // Validate stores to confirm that their not blank.
        if (code.length === 4 && (username.length > 0 || (host && token.length > 0))) {
            socket.emit("lobby:getMode", (modeID: string) => {
                mode = modeID;
            });

            if (host === true) {
                document.documentElement.requestFullscreen();
            }
        } else {
            resetStorageState();
            goto("/");
        }
    });
</script>

{#if mode === "vortex"}
    {#if host}
        <VortexHost />
    {:else}
        <VortexPlayer />
    {/if}
{/if}

