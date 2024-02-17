import React, { createContext, useContext, useEffect, useState } from 'react';
import { setCookie } from 'nookies';
import Router from 'next/router';

type User = {
  name: string;
  email: string;
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
}

export const UserContext = createContext({} as AuthContextType);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;  
  
  async function signIn({email, password}: SignInData) {
    try {
    const response = await fetch('https://api-coordinates.onrender.com/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const { token } = await response.json();

      if (response.ok) {
        setCookie(undefined, 'nucleo-token', token, {
          maxAge: 60 * 60 * 24 //24horas
        })

        const userResponse = await fetch(`https://api-coordinates.onrender.com/user/email/${email}`, {
          method: 'GET'
        });
  
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const user = await userResponse.json();

        setUser(user);

        Router.push("/");
      } else {
        alert('E-mail ou senha inválidos. Login falhou.');
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  return (
    <UserContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </UserContext.Provider>
  );
};
