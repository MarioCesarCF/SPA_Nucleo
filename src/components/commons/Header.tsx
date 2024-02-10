/*
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/header.module.css";
import { Raleway } from "next/font/google";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useUser } from './UserContext';

const raleway = Raleway({ subsets: ["latin"] });

export default function Header() {
  const { user } = useUser();
  const router = useRouter();

   
  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  const isLoginPage = router.pathname === '/login';

  return (
    <div className={raleway.className}>
      <header className={styles.header}>
        <Link href="/">
          <Image
            src="/images/logo_branca.png"
            alt="Ícone da Núcleo Ambiental"
            width={200}
            height={60}
            unoptimized
            className={styles.logo}
          />
        </Link>
        {!isLoginPage && (
          <div className={styles.profileContainer}>
            <div className={styles.profile}>
              <Image id="icon-profile"
                src="/images/profile-branco.png"
                alt="Ícone de profile"
                width={35}
                height={35}
              />
              {user && typeof user !== 'undefined' && 'name' in user && (
                <h1>Olá {user.name}</h1>
              )}
            </div>
            <nav className={styles.navigation}>
              <Link href="/acesso-adm">Acesso Adm</Link>
              <Link href="/suporte">Suporte</Link>
              <button onClick={handleLogout}>Sair</button>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
*/

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useUser } from '@/components/commons/UserContext';
import styles from "../../styles/header.module.css";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

export default function Header() {
  const { user } = useUser();
  const router = useRouter();

  console.log(user);
  
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    router.push('/login');
  };

  const isLoginPage = router.pathname === '/login';

  return (
    <div className={raleway.className}>
      <header className={styles.header}>
        <Link href="/">
          <Image
            src="/images/logo_branca.png"
            alt="Ícone da Núcleo Ambiental"
            width={200}
            height={60}
            unoptimized
            className={styles.logo}
          />
        </Link>
        {!isLoginPage && (
          <div className={styles.profileContainer}>
            <div className={styles.profile}>
              <Image id="icon-profile"
                src="/images/profile-branco.png"
                alt="Ícone de profile"
                width={35}
                height={35}
              />
              {user && (
                <div>Olá {user.name}</div>
              )}
            </div>
            <nav className={styles.navigation}>
              <Link href="/acesso-adm">Acesso Adm</Link>
              <Link href="/suporte">Suporte</Link>
              <button onClick={handleLogout}>Sair</button>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}