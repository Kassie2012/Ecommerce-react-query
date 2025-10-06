import { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth"; //detects if user is logged in/out
import { auth } from "../lib/firebase/firebase"

interface AuthContextType {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser) 
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