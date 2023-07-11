import { ProfileType } from "@/models/ProfileType";
import { create } from "zustand";

type ProfileStoreType = {
  profile: ProfileType;
  updateOnLocalStorage: (profile: ProfileType) => void;
  gainGp: (gp: number) => void;
  spentGp: (gp: number) => void;
  init: () => void;
};

export const useProfileStore = create<ProfileStoreType>((set) => ({
  profile: {
    id: 0,
    name: "John Doe",
    gp: 0,
  },
  init: () => {
    try {
      const profile = localStorage.getItem("profile");
      if (!profile) {
        throw new Error("Profile not found");
      }
      set((state) => ({
        profile: JSON.parse(profile),
      }));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
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
        gp: Number(state.profile.gp) + Number(gp),
      });
      return {
        profile: {
          ...state.profile,
          gp: Number(state.profile.gp) + Number(gp),
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
