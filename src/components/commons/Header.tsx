import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from "../../styles/header.module.css";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

export default function Header() {
  //const { user } = useUser();
  const router = useRouter();

  //console.log(user);
  
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_id");
      console.log(localStorage.getItem("token"));
    }
    
    router.push('/login');
  };

  const getUserInfoFromLocalStorage = () => {
    // Verifica se o localStorage está disponível (apenas no lado do cliente)
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('user_name');
      const id = localStorage.getItem('user_id');
      
      return { name, id };
    } else {
      return { name: null, id: null }; // Retorna valores padrão se o localStorage não estiver disponível
    }
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
              <div>Olá {userInfo.name}</div>
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