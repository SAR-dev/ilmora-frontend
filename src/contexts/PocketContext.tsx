import { createContext, useContext, useCallback, useState, useEffect, ReactNode } from "react";
import PocketBase from "pocketbase";
import { useInterval, useLocalStorage } from "usehooks-ts";
import { jwtDecode } from "jwt-decode";
import { Collections, TypedPocketBase, UsersResponse } from "types/pocketbase";
import { constants } from "constants";
import { api, setAuthToken } from "helpers";
import { UserSelfDataType } from "types/response";

interface DecodedToken {
    exp: number; // Expiration timestamp in seconds
}

const ONE_MINUTE_IN_MS = 60000;

interface PocketContextType {
    login: ({ email, password }: { email: string, password: string }) => Promise<void>;
    logout: () => void;
    user: UsersResponse | null;
    token: string | null;
    userData: UserSelfDataType;
}

// Initialize PocketBase with type safety
export const pb = new PocketBase(import.meta.env.VITE_API_URL) as TypedPocketBase;

// Create React context for PocketBase
const PocketContext = createContext<PocketContextType | undefined>(undefined);

// PocketBase Provider component
export const PocketbaseProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useLocalStorage<string | null>(
        constants.AUTH_TOKEN_KEY,
        pb.authStore.token
    );
    const [user, setUser] = useState<UsersResponse | null>(
        pb.authStore.record as unknown as UsersResponse
    );
    const [userData, setUserData] = useLocalStorage<UserSelfDataType>(
        constants.USER_SELF_DATA_KEY,
        { isStudent: false, isTeacher: false }
    )

    useEffect(() => {
        if(!user) return;
        api
            .get("/api/self")
            .then(res => setUserData(res.data))
    }, [user])
    

    // Clear local storage and PocketBase store on logout
    const logout = useCallback(() => {
        localStorage.clear();
        pb.authStore.clear();
        setUser(null);
        setAuthToken()
    }, []);

    // Handle login with error handling
    const login = useCallback(async ({
        email,
        password
    }: {
        email: string,
        password: string
    }) => {
        await pb.collection(Collections.Users).authWithPassword(email, password);
        setAuthToken()
        await api.get("/api/self").then(res => setUserData(res.data))
    }, []);

    // Refresh the session token periodically
    const refreshSession = useCallback(async () => {
        if (!token || !pb.authStore.isValid) return;

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            const tokenExpiration = decoded.exp ?? 0;
            const currentTimeInSeconds = Date.now() / 1000;

            // Refresh the token if it's close to expiration
            if (currentTimeInSeconds >= tokenExpiration - 5 * 60) {
                await pb.collection(Collections.Users).authRefresh();
                setAuthToken()
            }
        } catch (error) {
            console.error("Failed to refresh session:", error);
            logout();
        }
    }, [token, logout]);

    // Sync auth store changes to local state
    useEffect(() => {
        const unsubscribe = pb.authStore.onChange((newToken, model) => {
            setToken(newToken);
            setUser(model as unknown as UsersResponse);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [setToken]);

    // Clear session if token becomes invalid
    useEffect(() => {
        if (!pb.authStore.isValid) logout();
    }, [logout]);

    // Periodically refresh the session
    useInterval(refreshSession, token ? 2 * ONE_MINUTE_IN_MS : null);

    return (
        <PocketContext.Provider value={{ login, logout, user, token, userData }}>
            {children}
        </PocketContext.Provider>
    );
};

// Custom hook to access PocketContext
export const usePocket = () => {
    const context = useContext(PocketContext);
    if (!context) {
        throw new Error("usePocket must be used within a PocketProvider.");
    }
    return context;
};
