import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  role: 'ADMIN_PRINCIPAL' | 'ADMIN_SECONDAIRE' | 'USER';
}

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      setIsAdmin(user.role === 'ADMIN_PRINCIPAL' || user.role === 'ADMIN_SECONDAIRE');
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    // Dans une version de démonstration, nous utilisons un utilisateur codé en dur
    if (email === 'narindra.defis@gmail.com' && password === 'FihinoTsifoina') {
      const mockUser: User = {
        id: '1',
        email: 'narindra.defis@gmail.com',
        name: 'Narindra',
        role: 'ADMIN_PRINCIPAL'
      };
      setCurrentUser(mockUser);
      setIsAdmin(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signOut = async () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    isAdmin,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}