import CreateCompany from "@/components/specifics/CreateCompany";
import Head from "next/head";
import Link from "next/link";

export default function Cadastro() {
  return (
    <>
      <Head>
        <title>Cadastro | Núcleo Ambiental</title>
      </Head>
      <CreateCompany />     
    </>
  );
}
