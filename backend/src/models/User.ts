/**
 * Represents a user connected to the server. This includes information about the lobby they are in and whether they are the host.
 */

export interface User {
    id: string;
    lobby: {
        id: string;
        code: string;
        isHost: boolean;
    }
}