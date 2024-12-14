import { create } from "zustand";

type tauthStore = {
    isAuthenticated: boolean;
    setAuth: (newAuth: boolean) => void;

    user: null | {
        email: string;
        role: string;
    };
    setUser: (newUser: tauthStore["user"]) => void;
};

const authStore = create<tauthStore>((set) => ({
    isAuthenticated: false,
    setAuth: (isAuthenticated) => set({ isAuthenticated }),

    user: null,
    setUser: (newUser) => set({ user: newUser }),
}));

export const useAuth = () => {
    return authStore();
};
