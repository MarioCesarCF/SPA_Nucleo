import Head from "next/head";
import Link from "next/link";

export default function Suporte() {
  return (
    <>
      <Head>
        <title>Suporte | Núcleo Ambiental</title>
      </Head>
      <Link href="/"><i className="fa-solid fa-house" title="Botão para voltar à página principal."></i></Link>
      <h1>Suporte</h1>      
    </>
  );
}