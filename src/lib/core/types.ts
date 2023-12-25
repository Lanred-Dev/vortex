import type { Socket } from "socket.io-client";

export type setting = {
    title: string;
    description: string;
    value: number[] | number | boolean;
};

export type mode = {
    title: string;
    description: string;
    id: string;
    minPlayers: number;
    maxPlayers: number;
    cardTheme: "space";
    settings: { [key: string]: setting };
};

export type player = {
    username: string;
    socket: Socket;
    data: { [key: string]: any };
};

