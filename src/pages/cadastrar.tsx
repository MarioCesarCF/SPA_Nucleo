import CreateCompany from "@/components/specifics/CreateCompany";
import Head from "next/head";
import Link from "next/link";

export default function Cadastro() {
  return (
    <>
      <Head>
        <title>Cadastro | Núcleo Ambiental</title>
      </Head>
      <Link href="/"><i className="fa-solid fa-house" title="Botão para voltar à página principal."></i></Link>
      <CreateCompany />     
    </>
  );
}
