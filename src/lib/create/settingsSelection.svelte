<script lang="ts">
    import type { setting, mode } from "$lib/core/types";

    export let mode: mode;
    export let callback: (values: { [key: string]: number | boolean }) => void;
    $: settings = Object.values(mode.settings);
    let values: { [key: string]: number | boolean } = {};

    $: settings.forEach((setting: setting) => {
        values[setting.title] = Array.isArray(setting.value) && typeof setting.value[0] === "number" ? setting.value[1] : (setting.value as any);
    });

    function updateValue(setting: string, event: any, type: string = "normal") {
        values[setting] = type === "checkbox" ? event.target.checked : event.target.value;
    }
</script>

<div class="form absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-6 w-full text-left">
    {#each settings as setting}
        <div class="w-full flex justify-between items-center gap-4">
            <p class="uppercase text-3xl font-black tracking-[0.5rem]">{setting.title}</p>

            <div class="flex items-center gap-2">
                {#if typeof setting.value === "boolean"}
                    <p class="text-lg">{values[setting.title] === true ? "on" : "off"}</p>

                    <input
                        class="aspect-square h-5"
                        type="checkbox"
                        checked={setting.value}
                        on:input={(event) => {
                            updateValue(setting.title, event, "checkbox");
                        }}
                    />
                {:else if Array.isArray(setting.value) && typeof setting.value[0] === "number"}
                    <p class="text-lg">{values[setting.title]}</p>

                    <input
                        class="glassSecondary transparent h-4 w-full md:w-[150px] lg:w-[200px] cursor-pointer appearance-none !p-0"
                        type="range"
                        step="1"
                        value={setting.value[1]}
                        min={setting.value[0]}
                        max={setting.value[2]}
                        on:input={(event) => {
                            updateValue(setting.title, event);
                        }}
                    />
                {/if}
            </div>
        </div>
    {/each}

    <button
        on:click={() => {
            callback(values);
        }}>Create lobby</button
    >
</div>

<style lang="postcss">
    input[type="range"]::-webkit-slider-thumb {
        @apply w-4 h-4 bg-blue-600 rounded-full appearance-none;
    }
</style>
