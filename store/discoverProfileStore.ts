import { create } from 'zustand';

interface ICurrentUser {
  first_name: string;
  id: string;
  photos: {
    id: string;
    src: string;
  }[];
}

interface IState {
  id: string | null;
  profile: FullProfile | null;
  currentUser: ICurrentUser | {};
  setProfile: (profile: FullProfile) => void;
  setCurrentUser: (profile: ICurrentUser) => void;
  clearCurrentUser: () => void;
  clearProfile: () => void;
}

export const useStore = create<IState>()((set) => ({
  id: null,
  profile: null,
  currentUser: {},
  setProfile: (profile) =>
    set((state) => {
      return {
        profile: profile,
      };
    }),
  setCurrentUser: (profile) =>
    set((state) => {
      return { currentUser: profile };
    }),
  clearCurrentUser: () =>
    set((state) => {
      return {
        currentUser: {},
      };
    }),
  clearProfile: () =>
    set((state) => {
      return {
        profile: null,
      };
    }),
}));
