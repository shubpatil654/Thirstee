// app/hooks/useAuth.ts
import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Your logic to check authentication (Firebase, Supabase, JWT, etc.)
        const checkAuth = async () => {
            try {
                // Example: const session = await getSession();
                // setUser(session.user);
            } catch (error) {
                console.error("Auth error:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { user, loading };
};