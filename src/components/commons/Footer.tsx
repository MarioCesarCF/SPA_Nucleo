import styles from "../../styles/footer.module.css";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

const Footer = () => {
  return (
    <div>
      <br></br>
      <footer className={styles.footer}>
      <p className={styles.test_footer}>
        Propriedade de  <a href="https://www.nucleoambiente.com.br/" target="_blank"> @Núcleo Ambiental</a> | Desenvolvido por  <a href="https://github.com/MarioCesarCF" target="_blank"> @MárioCesarDev</a>
      </p>
    </footer>
    </div>
    
  );
}

export default Footer;