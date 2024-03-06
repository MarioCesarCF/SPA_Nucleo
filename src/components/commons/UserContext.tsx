import React, { createContext, useContext, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
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
  user: User | null; // Corrigido para permitir valor nulo
  signIn: (data: SignInData) => Promise<void>;
}

export const UserContext = createContext({} as AuthContextType);

export function UserProvider({ children }: any) {
  const apiURL = "https://api-coordinates.onrender.com";

  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;  

  useEffect(() => {
    const fetchUser = async () => {
      const { email } = parseCookies();

      if (email) {
        try {
          const response = await fetch(`${apiURL}/user/email/${email}`, {
            method: 'GET'
          });

          if (!response.ok) {
            throw new Error('Erro ao buscar os dados do usuário');
          }

          const userData: User = await response.json();

          setUser(userData);
        } catch (error) {
          alert(`Erro ao buscar usuário: ${error}`);
        }
      }
    };

    fetchUser();
  }, []);

  async function signIn({email, password}: SignInData) {
    try {
      const response = await fetch(`${apiURL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('E-mail ou senha inválidos. Login falhou.');
      }

      const { token } = await response.json();

      const userDataResponse = await fetch(`${apiURL}/user/email/${email}`, {
        method: 'GET'
      });

      if (!userDataResponse.ok) {
        throw new Error('Erro ao buscar os dados do usuário');
      }

      const userData: User = await userDataResponse.json();

      setUser(userData);

      setCookie(undefined, 'user', JSON.stringify(userData), {
        maxAge: 60 * 60 * 24 // 24 horas
      });

      setCookie(undefined, 'nucleo-token', token, {
        maxAge: 60 * 60 * 24 // 24 horas
      });

      setCookie(undefined, 'email', email, {
        maxAge: 60 * 60 * 24 // 24 horas
      });

      Router.push("/home");
    } catch (error: any) { // Aqui estamos tipando 'error' explicitamente como 'any'
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <UserContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </UserContext.Provider>
  );
};