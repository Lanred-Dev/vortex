import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const backgroundColor: Writable<string> = writable("#050505");