import React, { createContext, useContext, useState, useEffect } from 'react';
import { WishlistItem } from '../types';
import { StorageService } from '../services/storage';

interface WishlistContextType {
  items: WishlistItem[];
  toggleWishlist: (item: Omit<WishlistItem, 'addedAt'>) => boolean;
  isWishlisted: (itemId: string, itemType: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    setItems(StorageService.getWishlist());
  }, []);

  const toggleWishlist = (item: Omit<WishlistItem, 'addedAt'>): boolean => {
    const isAdded = StorageService.toggleWishlist(item);
    setItems(StorageService.getWishlist());
    return isAdded;
  };

  const isWishlisted = (itemId: string, itemType: string): boolean => {
    return items.some(w => w.itemId === itemId && w.itemType === itemType);
  };

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
