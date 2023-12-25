import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const host: Writable<boolean> = writable(false);
export const token: Writable<string> = writable("");
export const code: Writable<string> = writable("");
export const username: Writable<string> = writable("");

export function saveState(newHost: boolean, newToken: string, newCode: string, newUsername: string) {
    host.set(newHost);
    token.set(newToken);
    code.set(newCode);
    username.set(newUsername);

    localStorage.setItem("host", newHost.toString());
    localStorage.setItem("token", newToken || "");
    localStorage.setItem("code", newCode);
    localStorage.setItem("username", newUsername || "");
}

export function resetStorageState() {
    localStorage.setItem("host", "false");
    localStorage.setItem("token", "");
    localStorage.setItem("code", "");
    localStorage.setItem("username", "");
}

export function getStateFromStorage(): { [key: string]: boolean | string } {
    const host: boolean = localStorage.getItem("host") === "true";
    const token: string = localStorage.getItem("token") || "";
    const code: string = localStorage.getItem("code") || "";
    const username: string = localStorage.getItem("username") || "";
    return { host, token, code, username };
}
