<script lang="ts">
    import Background from "$lib/core/background.svelte";
    import HeightFix from "$lib/core/heightFix.svelte";
    import ConnectionStatus from "$lib/core/connectionStatus.svelte";
    import LobbyReconnect from "$lib/core/lobbyReconnect.svelte";
    import "$lib/core/tailwind.css";
</script>

<svelte:head>
    <title>Vortex</title>
</svelte:head>

<HeightFix />
<Background />
<ConnectionStatus />
<LobbyReconnect />

<main class="h-screen w-screen absolute top-0 left-1/2 -translate-x-1/2 z-[4] overflow-x-hidden">
    <slot />
</main>
