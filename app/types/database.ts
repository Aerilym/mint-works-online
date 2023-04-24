import type { Database } from '@/lib/database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Game = Database['public']['Tables']['game']['Row'];
export type Lobby = Database['public']['Tables']['lobbies']['Row'];
