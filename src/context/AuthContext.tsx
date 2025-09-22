import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { onAuthStateChanged, type User, type Auth } from "firebase/auth"; //detects if user is logged in/out
import { auth } from "../lib/firebase/firebase"

interface AuthContextType {
    user: null | User,
    setUser: (user:User) => void
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: (user:User) => {}
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}; 

export const useAuth = () => useContext(AuthContext); 

export default AuthContext;