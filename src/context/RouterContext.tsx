import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  path: string;
  params: Record<string, string>;
  searchParams: URLSearchParams;
  navigate: (to: string, state?: Record<string, any>) => void;
  goBack: () => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [searchParams, setSearchParams] = useState<URLSearchParams>(() => {
    return new URLSearchParams(window.location.search);
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentUrl(window.location.pathname || '/');
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    const [pathname, search] = to.split('?');
    const targetPath = pathname || '/';
    const targetSearch = search ? `?${search}` : '';

    if (window.location.pathname !== targetPath || window.location.search !== targetSearch) {
      window.history.pushState({}, '', targetPath + targetSearch);
      setCurrentUrl(targetPath);
      setSearchParams(new URLSearchParams(targetSearch));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    window.history.back();
  };

  // Simple route parameter matching (e.g. /hotels/:id, /packages/:id, /booking/:id)
  const params: Record<string, string> = {};
  const segments = currentUrl.split('/').filter(Boolean);

  if (segments.length === 2) {
    if (segments[0] === 'hotels') params.id = segments[1];
    if (segments[0] === 'packages') params.id = segments[1];
    if (segments[0] === 'activities') params.id = segments[1];
    if (segments[0] === 'booking') params.id = segments[1];
  }

  return (
    <RouterContext.Provider
      value={{
        path: currentUrl,
        params,
        searchParams,
        navigate,
        goBack
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
