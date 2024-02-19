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
  user: User;
  signIn: (data: SignInData) => Promise<void>;
}

export const UserContext = createContext({} as AuthContextType);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;  

  useEffect(() => {
    const fetchUser = async () => {
      const { email } = parseCookies();

      if (email) {
        try {
          const response = await fetch(`https://api-coordinates.onrender.com/user/email/${email}`, {
            method: 'GET'
          });

          if (!response.ok) {
            throw new Error('Erro ao buscar os dados do usuário');
          }

          const userData: User = await response.json();

          setCookie(undefined, 'user', userData.name, {
            maxAge: 60 * 60 * 24 //24horas
          })

          setUser(userData);
        } catch (error) {
          console.error(error);
          alert("Usuário não encontrado");
        }
      }
    };

    fetchUser();
  }, []);

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
        const response = await fetch(`https://api-coordinates.onrender.com/user/email/${email}`, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar os dados do usuário');
        }

        const userData: User = await response.json();

        setCookie(undefined, 'user', userData.name, {
          maxAge: 60 * 60 * 24 //24horas
        })

        setUser(userData);

        setCookie(undefined, 'nucleo-token', token, {
          maxAge: 60 * 60 * 24 //24horas
        })

        setCookie(undefined, 'email', email, {
          maxAge: 60 * 60 * 24 //24horas
        })
        
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
