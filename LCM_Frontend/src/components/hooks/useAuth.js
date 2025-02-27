// hooks/useAuth.js
import { useState, useEffect } from 'react';
// Import supabase
import { supabase } from '../createClient'; // Adjust path as needed

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Optional
  const [error, setError] = useState(null);     // Optional

  useEffect(() => {
    // Check for existing session on mount
    supabase.auth.getSession()
    .then(({ data: { session } }) => {
      setUser(session?.user ?? null);  // Use optional chaining
      setLoading(false);
    }).catch(error => {
      setError(error.message);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const login = async (email, password) => {
    setLoading(true); // Optional
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setUser(data.user);  // Not necessary with onAuthStateChange but helpful if you want immediate state updates.
      setLoading(false); // Optional
    } catch (error) {
      setError(error.message);
      setLoading(false); // Optional
      return false;
    }
    return true;
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try{
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUser(null);
      setLoading(false);
    }
    catch (error){
      setError(error.message);
      setLoading(false);
    }
  };

  return { user, login, logout, loading, error };  //Optional loading and error states
};

export default useAuth;