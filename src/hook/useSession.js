import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const useSession = () => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        // Get the current session
        const currentSession = supabase.auth.session();
        setSession(currentSession);

        // Listen for auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        // Cleanup subscription on unmount
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return session;
};

export default useSession;
