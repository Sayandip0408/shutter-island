import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";

const defaultContext = createContext({
    authUser: null,
    isLoading: true,
    // isDark: localStorage.getItem('Theme') === 'true',
})

export default function useFirebaseAuth() {
    // const [isDark, setIsDark] = useState(
    //     localStorage.getItem('Theme') === 'true'
    // );
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const clear = () => {
        setAuthUser(null);
        setIsLoading(false);
    };

    const authStateChanged = async (user) => {
        setIsLoading(true);
        if (!user) {
            clear();
            return;
        }
        setAuthUser({
            uid: user.uid,
            email: user.email,
        });
        setIsLoading(false);
    };

    const signOut = () => {
        authSignOut(auth).then(() => clear());
    };

    // const toggleThemeStatus = () => {
    //     const newThemeStatus = !isDark;
    //     setIsDark(newThemeStatus);
    //     localStorage.setItem('Theme', String(newThemeStatus));
    // };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubscribe();
    }, []);

    return {
        // isDark,
        authUser,
        isLoading,
        setIsLoading,
        signOut,
        // toggleThemeStatus,
        setAuthUser,
    };
};

export const ContextProvider = ({ children }) => {
    const _auth = useFirebaseAuth();
    return (
        <defaultContext.Provider value={_auth}>
            {children}
        </defaultContext.Provider>
    );
};

export const useDefaultContext = () => {
    return useContext(defaultContext);
};
