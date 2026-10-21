import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, TravelerDetail } from '../types';
import { StorageService } from '../services/storage';

interface AuthContextType {
  user: UserProfile;
  role: UserRole;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addSavedTraveler: (traveler: TravelerDetail) => void;
  removeSavedTraveler: (idNumber: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => StorageService.getActiveRole());
  const [user, setUser] = useState<UserProfile>(() => StorageService.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    const currentUser = StorageService.getUser();
    setUser(currentUser);
    setRole(currentUser.role);
  }, []);

  const switchRole = (newRole: UserRole) => {
    StorageService.setActiveRole(newRole);
    setRole(newRole);
    const u = StorageService.getUser();
    setUser({ ...u, role: newRole });
  };

  const login = (email: string, forcedRole: UserRole = 'user') => {
    const base = StorageService.getUser();
    const updated: UserProfile = {
      ...base,
      email,
      role: forcedRole
    };
    StorageService.saveUser(updated);
    StorageService.setActiveRole(forcedRole);
    setUser(updated);
    setRole(forcedRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    const newUser = { ...user, ...updated };
    setUser(newUser);
    StorageService.saveUser(newUser);
  };

  const addSavedTraveler = (traveler: TravelerDetail) => {
    const current = user.savedTravelers || [];
    const exists = current.findIndex(t => t.idNumber === traveler.idNumber);
    let updatedTravelers: TravelerDetail[];
    if (exists >= 0) {
      updatedTravelers = [...current];
      updatedTravelers[exists] = traveler;
    } else {
      updatedTravelers = [...current, traveler];
    }
    updateProfile({ savedTravelers: updatedTravelers });
  };

  const removeSavedTraveler = (idNumber: string) => {
    const current = user.savedTravelers || [];
    const updatedTravelers = current.filter(t => t.idNumber !== idNumber);
    updateProfile({ savedTravelers: updatedTravelers });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        switchRole,
        login,
        logout,
        updateProfile,
        addSavedTraveler,
        removeSavedTraveler
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
