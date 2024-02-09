import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/footer.module.css";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

export default function Footer() {
  return (
    <div className={raleway.className}>
      <footer className={styles.footer}>
        <p className={styles.test_footer}>
          Propriedade de <a href="https://www.nucleoambiente.com.br/" target="_blank">@Núcleo Ambiental</a> | Desenvolvido por <a href="https://github.com/MarioCesarCF" target="_blank">@MárioCesarDev</a>
          2023
        </p>
      </footer>
    </div>
  );
}
