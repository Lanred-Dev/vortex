<script lang="ts">
    import { goto } from "$app/navigation";
    import socket from "$lib/core/socket";
    import { saveState } from "$lib/stores/lobby";

    let lobbyFound: boolean | null = null;
    let usernameAvailable: boolean | null = null;
    let code: string = "";
    let username: string = "";

    function validateCode() {
        if (code.length < 4) {
            lobbyFound = false;
            usernameAvailable = null;
            return;
        }

        socket.emit("lobby:validateCode", code, function (valid: boolean) {
            lobbyFound = valid;

            if (!lobbyFound) usernameAvailable = null;
        });
    }

    function validateUsername() {
        if (lobbyFound !== true) return;

        socket.emit("lobby:validateUsername", code, username, (valid: boolean) => {
            usernameAvailable = valid;
        });
    }

    function joinLobby() {
        if (lobbyFound !== true || usernameAvailable !== true) return;

        socket.emit("player:join", false, code, username, () => {
            saveState(false, "", code, username);
            goto("/game");
        });
    }
</script>

<div class="form w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-14">
    <div class="input">
        <div>
            <p class="title">game code</p>
            <p class="status {lobbyFound === null ? 'hidden' : lobbyFound ? 'success' : 'failure'}">{lobbyFound ? "found" : "not found"}</p>
        </div>

        <input placeholder="4-letter code" bind:value={code} on:keyup={validateCode} />
    </div>

    <div class="input">
        <div>
            <p class="title">name</p>
            <p class="status {usernameAvailable === null ? 'hidden' : usernameAvailable ? 'success' : 'failure'}">{usernameAvailable ? "available" : "not available"}</p>
        </div>

        <input placeholder="enter your name" bind:value={username} on:keyup={validateUsername} />
    </div>

    <button on:click={joinLobby}>Join</button>

    <div class="w-full mt-4 mb-1 flex justify-center items-center gap-2">
        <div class="w-full h-[1px] bg-background-300"></div>
        <p class="uppercase text-[rgb(133,133,133)] font-semibold">or</p>
        <div class="w-full h-[1px] bg-background-300"></div>
    </div>

    <a href="/create">Create game</a>
</div>
