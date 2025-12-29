'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/definitions';
import { users } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('goshop-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userToStore = { ...foundUser };
      delete userToStore.password;
      setUser(userToStore);
      localStorage.setItem('goshop-user', JSON.stringify(userToStore));
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${userToStore.name}!`,
      });
      router.push(userToStore.role === 'admin' ? '/admin' : '/account');
      return true;
    }
    toast({
      variant: 'destructive',
      title: 'Login Failed',
      description: 'Invalid email or password.',
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('goshop-user');
    router.push('/');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock signup
    if (users.some(u => u.email === email)) {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: 'An account with this email already exists.',
      });
      return false;
    }

    const newUser: User = {
      id: String(users.length + 1),
      name,
      email,
      role: 'user',
      avatar: 'user-avatar-2',
    };
    
    // In a real app, you would save the new user to the database.
    // For this mock, we don't permanently add them to the `users` array.

    setUser(newUser);
    localStorage.setItem('goshop-user', JSON.stringify(newUser));
    
    toast({
        title: 'Signup Successful',
        description: `Welcome to GoShop, ${name}!`,
    });
    router.push('/');
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
