import Head from "next/head";
import Link from "next/link";

export default function AcessoAdm() {
  return (
    <>
      <Head>
        <title>Acesso Adm | Núcleo Ambiental</title>
      </Head>
      <Link href="/"><i className="fa-solid fa-house" title="Botão para voltar à página principal."></i></Link>
      <h1>Acesso Adm</h1>
    </>
  );
}
