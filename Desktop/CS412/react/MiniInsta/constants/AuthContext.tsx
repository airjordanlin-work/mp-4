// constants/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  token: string;
  profileId: number;
  setToken: (token: string) => void;
  setProfileId: (id: number) => void;
};

const AuthContext = createContext<AuthContextType>({
  token: '',
  profileId: 0,
  setToken: () => {},
  setProfileId: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState('');
  const [profileId, setProfileId] = useState(0);

  return (
    <AuthContext.Provider value={{ token, profileId, setToken, setProfileId }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);