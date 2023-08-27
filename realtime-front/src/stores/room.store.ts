import { create } from "zustand";

interface RoomStore {
    room: string;
    setRoom: (room: string) => void;
}

const useRoomStore = create<RoomStore>(set => ({
    room: '',
    setRoom: (room: string) => set(state => ({ ...state, room })),
}));

export default useRoomStore;