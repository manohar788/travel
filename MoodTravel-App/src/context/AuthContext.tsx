import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User, Booking } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  bookings: Booking[];
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addBooking: (booking: Booking) => void;
  cancelBooking: (id: string) => void;
}

const AuthContext = createContext<AuthState | null>(null);

const STORAGE_KEY = 'moodtravel_users';
const TOKEN_KEY = 'moodtravel_token';
const BOOKINGS_KEY = 'moodtravel_bookings';

function getStoredUsers(): Array<{ name: string; email: string; password: string; role: 'user' | 'admin' }> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch { /* empty */ }
  const defaults = [
    { name: 'Admin', email: 'admin@moodtravel.com', password: 'admin123', role: 'admin' as const },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  return defaults;
}

function getStoredBookings(): Booking[] {
  try {
    const data = localStorage.getItem(BOOKINGS_KEY);
    if (data) return JSON.parse(data);
  } catch { /* empty */ }
  return [];
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(getStoredBookings);

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken) {
      try {
        const parsed = JSON.parse(atob(savedToken));
        setUser(parsed);
        setToken(savedToken);
      } catch { /* empty */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const login = useCallback(async (email: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password');
    const userData: User = {
      _id: btoa(found.email),
      name: found.name,
      email: found.email,
      role: found.role,
      createdAt: new Date().toISOString(),
    };
    const tkn = btoa(JSON.stringify(userData));
    localStorage.setItem(TOKEN_KEY, tkn);
    setUser(userData);
    setToken(tkn);
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const users = getStoredUsers();
    if (users.find((u) => u.email === email)) {
      throw new Error('Email already registered');
    }
    users.push({ name, email, password, role: 'user' });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    const userData: User = {
      _id: btoa(email),
      name,
      email,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    const tkn = btoa(JSON.stringify(userData));
    localStorage.setItem(TOKEN_KEY, tkn);
    setUser(userData);
    setToken(tkn);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setToken(null);
  }, []);

  const addBooking = useCallback((booking: Booking) => {
    setBookings((prev) => [...prev, booking]);
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: 'cancelled' as const } : b))
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        bookings,
        login,
        signup,
        logout,
        addBooking,
        cancelBooking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
