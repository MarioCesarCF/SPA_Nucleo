/*
import Link from "next/link";
import styles from "@/styles/login.module.css";
import { Raleway } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from '@/components/commons/UserContext';
import Cookies from 'js-cookie';

const raleway = Raleway({ subsets: ["latin"] });

export default function LoginAccess() {
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api-coordinates.onrender.com/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        Cookies.set('token', token);
        
        const user = await fetch(`https://api-coordinates.onrender.com/user/email/${email}`, {
            method: 'GET'
          });

          if (!user.ok) {
            throw new Error('Failed to fetch data');
          }

          
        const userData = await user.json();
        
        setUser(userData);
        router.push('/');
        
      } else {
        alert('E-mail ou senha inválidos. Login falhou.');
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };
 
  return (
    <div className={styles.pageContainer}>
      <div className={raleway.className}>
        <div className={styles.contentWrap}></div>
        <main className={styles.main}>
          <form className={styles.login_form} onSubmit={handleLogin}>
            <h1>E-mail:</h1>
            <input type="mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <h1>Senha:</h1>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Link href="/">
              <p className={styles.esqueceu_senha}>Esqueceu a senha?</p>
            </Link>
            <button className={styles.button} type="submit">ENTRAR</button>
          </form>
        </main>
      </div>
    </div>
  );
}
*/
// LoginAccess.js

import Link from "next/link";
import styles from "@/styles/login.module.css";
import { Raleway } from "next/font/google";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useUser } from '@/components/commons/UserContext';

const raleway = Raleway({ subsets: ["latin"] });

export default function LoginAccess() {
  const router = useRouter();
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://api-coordinates.onrender.com/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const { token } = await response.json();
        Cookies.set('token', token);
        
        const userResponse = await fetch(`https://api-coordinates.onrender.com/user/email/${email}`, {
          method: 'GET'
        });
  
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const userData = await userResponse.json();
        
        setUser(userData);
        router.push('/');
      } else {
        alert('E-mail ou senha inválidos. Login falhou.');
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={raleway.className}>
        <div className={styles.contentWrap}></div>
        <main className={styles.main}>
          <form className={styles.login_form} onSubmit={handleLogin}>
            <h1>E-mail:</h1>
            <input type="mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <h1>Senha:</h1>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Link href="/">
              <p className={styles.esqueceu_senha}>Esqueceu a senha?</p>
            </Link>
            <button className={styles.button} type="submit">ENTRAR</button>
          </form>
        </main>
      </div>
    </div>
  );
}
