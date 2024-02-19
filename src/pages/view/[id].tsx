import ViewCompany from "@/components/specifics/ViewCompany";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function View() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Cadastro | Núcleo Ambiental</title>
      </Head>
      <ViewCompany companyId={id || ""} />     
      <Link href="/">Ir para a Página Inicial.</Link>
    </>
  );
}
