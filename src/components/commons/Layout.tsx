import { ReactNode } from "react";
import Header from "./Header";
import { Poppins } from "next/font/google";
import Footer from "./Footer";
import { UserProvider } from './UserContext';
import styles from "../../styles/layout.module.css";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <UserProvider>
      <div className={poppins.className}>
        <div className={styles.container}>
          <Header />
          <div className={styles.content}>{children}</div>
          <Footer />
        </div>
      </div>
    </UserProvider>
  );
}
