import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from "../../styles/header.module.css";
import { Raleway } from "next/font/google";
import { destroyCookie } from 'nookies';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const raleway = Raleway({ subsets: ["latin"] });

export default function Header() {
  const router = useRouter();
  
  const handleLogout = () => {    
    destroyCookie(null, "nucleo-token");
    destroyCookie(null, "user");
    router.push('/login');
  };

  const getUserInfoFromLocalStorage = () => {
    const { user } = useContext(UserContext);

    return user;
  };

  const userInfo = getUserInfoFromLocalStorage();

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
              <div>Olá {userInfo?.name}</div>
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