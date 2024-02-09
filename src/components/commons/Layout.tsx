import { ReactNode } from "react";
import Header from "./Header";
import { Poppins } from "next/font/google";
import Footer from "./Footer";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={poppins.className}>
      <Header />
      {/* Neste caso os próximos componentes serão renderizados abaixo */}
      {children}
      <Footer />
    </div>
  );
}
