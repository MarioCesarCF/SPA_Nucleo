import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/header.module.css";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });



export default function Header() {
  const name = "Jubscleitons";
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
        <div className={styles.profileContainer}>
          <div className={styles.profile}>
            <Image id="icon-profile"
              src="/images/profile-branco.png"
              alt="Ícone de profile"
              width={35}
              height={35}
            />
            <h1>Olá {name}</h1>
          </div>
          <nav className={styles.navigation}>
            <Link href="/acesso-adm">Acesso Adm</Link>
            <Link href="/suporte">Suporte</Link>
            <Link href="/login">Sair</Link>
          </nav>
        </div>
      </header>
    </div>
  );
}