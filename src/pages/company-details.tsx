import ViewCompany from "@/components/specifics/ViewCompany";
import Head from "next/head";
import Link from "next/link";

export default function View() {
  return (
    <>
      <Head>
        <title>Cadastro | Núcleo Ambiental</title>
      </Head>
      <ViewCompany />     
      <Link href="/">Ir para a Página Inicial.</Link>
    </>
  );
}
