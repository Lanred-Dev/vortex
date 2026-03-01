import { Lobby } from "../models/Lobby.js";
import generateDocumentID from "../utils/generateID.js";

const LOBBY_ID_LENGTH: number = parseInt(process.env.LOBBY_ID_LENGTH!);

export const lobbies = new Map<string, Lobby>();

/**
 * Creates a new lobby with the given name and a randomly generated id.
 * 
 * @param name The name of the lobby.
 * @returns The id of the created lobby.
 */
export function createLobby(name: string): string {
    const id = generateDocumentID(LOBBY_ID_LENGTH);
    lobbies.set(id, { id, name, players: [] });
    return id;
}

/**
 * Gets the lobby with the given id.
 * 
 * @param id
 * @returns The lobby with the given id or undefined if it doesn't exist.
 */
export function getLobby(id: string) {
    return lobbies.get(id);
}