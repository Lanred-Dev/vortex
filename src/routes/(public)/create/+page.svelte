<script lang="ts">
    import Header from "$lib/core/components/header.svelte";
    import ModeSelection from "$lib/pages/create/modeSelection.svelte";
    import SettingsSelection from "$lib/pages/create/settingsSelection.svelte";
    import Loader from "$lib/pages/create/loader.svelte";
    import { goto } from "$app/navigation";
    import socket from "$lib/core/socket";
    import { saveState } from "$lib/stores/lobby";
    import type { mode } from "$lib/core/types";

    export let data: { modes: mode[] };
    let stage: string = "mode";
    $: stageTitle = stage === "mode" ? "choose a mode" : stage === "settings" ? "choose settings" : stage === "creating" ? "creating lobby" : stage === "failed" ? "failed to create lobby" : "";
    let modeData: mode;
    let creationData: { mode: string; settings: { [key: string]: number | boolean } } = {
        mode: "",
        settings: {},
    };

    function modeSelectionCallback(mode: mode) {
        modeData = mode;
        creationData.mode = mode.id;
        stage = "settings";
    }

    function settingsSelectionCallback(values: { [key: string]: number | boolean }) {
        creationData.settings = values;
        stage = "creating";

        socket.emit("host:create", creationData, (success: boolean, code: string, token: string) => {
            if (success === false) {
                stage = "failed";
                return;
            }

            saveState(true, token, code, "");
            goto(`/game`);
        });
    }
</script>

<Header text={stageTitle} />

{#if stage === "mode"}
    <ModeSelection modes={data.modes} callback={modeSelectionCallback} />
{:else if stage === "settings"}
    <SettingsSelection mode={modeData} callback={settingsSelectionCallback} />
{:else if stage === "creating"}
    <Loader />
{/if}
