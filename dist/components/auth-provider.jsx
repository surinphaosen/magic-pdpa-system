"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
const AuthContext = createContext(undefined);
const mockUsers = [
    { username: "admin1", password: "password1234", role: "Admin" },
    { username: "user1", password: "password1234", role: "Department User", department: "HR" },
];
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        const savedUser = localStorage.getItem("pdpa-user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);
    useEffect(() => {
        if (!isLoading && !user && pathname !== "/login") {
            router.push("/login");
        }
    }, [user, isLoading, pathname, router]);
    const login = (username, password) => {
        const foundUser = mockUsers.find((u) => u.username === username && u.password === password);
        if (foundUser) {
            const userData = {
                username: foundUser.username,
                role: foundUser.role,
                department: foundUser.department,
            };
            setUser(userData);
            localStorage.setItem("pdpa-user", JSON.stringify(userData));
            router.push("/dashboard");
            return true;
        }
        return false;
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("pdpa-user");
        router.push("/login");
    };
    return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
