import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

interface User {
  id: string;
  nickname: string;
  setNickname: (nickname: string) => void
}

const useUserStore = create<User>(set => ({
  id: uuid(),
  nickname: '',
  setNickname: (nickname: string) => set(state => ({ ...state, nickname })),
}));

export default useUserStore;