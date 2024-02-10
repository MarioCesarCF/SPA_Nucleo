import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext({ user: null, setUser: (userData) => {} });

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(() => {
    const storedUser = Cookies.get('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Armazena por 7 dias
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
