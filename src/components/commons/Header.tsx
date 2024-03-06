import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from "../../styles/header.module.css";
import { Poppins } from "next/font/google";
import { destroyCookie } from 'nookies';
import { UserContext } from './UserContext';

const raleway = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export default function Header() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  
  const handleLogout = () => {    
    destroyCookie(null, "nucleo-token");
    destroyCookie(null, "user");
    router.push('/');
  };

  const isLoginPage = router.pathname === '/';

  return (
    <div className={raleway.className}>
      <header className={styles.header}>
        <Link href="/home">
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
              <div>Olá {user?.name}</div> {/* Aqui você acessa diretamente o nome do usuário */}
            </div>
            <nav className={styles.navigation}>
              <Link href="/acesso-adm"><span className={styles.colorText}>Acesso Adm</span></Link>
              <Link href="/suporte"><span className={styles.colorText}>Suporte</span></Link>
              <button onClick={handleLogout}><span className={styles.colorText}>Sair</span></button>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
