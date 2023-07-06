import { ProfileType } from "@/model/ProfileType";
import { create } from "zustand";

type ProfileStoreType = {
  profile: ProfileType;
  updateOnLocalStorage: (profile: ProfileType) => void;
  gainGp: (gp: number) => void;
  spentGp: (gp: number) => void;
};

export const useProfileStore = create<ProfileStoreType>((set) => ({
  profile: {
    id: 0,
    name: "John Doe",
    gp: 0,
  },

  updateOnLocalStorage: (profile: ProfileType) => {
    set((state) => {
      localStorage.setItem("profile", JSON.stringify(profile));
      return state;
    });
  },

  gainGp: (gp: number) => {
    set((state) => {
      state.updateOnLocalStorage({
        ...state.profile,
        gp: state.profile.gp + gp,
      });
      return {
        profile: {
          ...state.profile,
          gp: state.profile.gp + gp,
        },
      };
    });
  },

  spentGp: (gp: number) => {
    set((state) => {
      state.updateOnLocalStorage({
        ...state.profile,
        gp: state.profile.gp + gp,
      });
      return {
        profile: {
          ...state.profile,
          gp: state.profile.gp - gp,
        },
      };
    });
  },
}));
