import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { ThemeMode, User } from '../types';
import { mockUsers } from '../data/mock';

type AppContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

const themeKey = 'assetflow-theme';
const userKey = 'assetflow-user';

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const stored = window.localStorage.getItem(themeKey);
    return stored === 'dark' ? 'dark' : 'light';
  });
  const [currentUser, setCurrentUserState] = useState<User>(() => {
    const stored = window.localStorage.getItem(userKey);
    if (!stored) return mockUsers[0];
    try {
      return JSON.parse(stored) as User;
    } catch {
      return mockUsers[0];
    }
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(themeKey, theme);
  }, [theme]);

  const value = useMemo<AppContextValue>(
    () => ({
      theme,
      setTheme: setThemeState,
      currentUser,
      setCurrentUser: (user) => {
        setCurrentUserState(user);
        window.localStorage.setItem(userKey, JSON.stringify(user));
      },
      sidebarOpen,
      setSidebarOpen,
      notificationsOpen,
      setNotificationsOpen,
    }),
    [theme, currentUser, sidebarOpen, notificationsOpen]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
