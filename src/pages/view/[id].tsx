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
        <title>Empresa | Núcleo Ambiental</title>
      </Head>
      <ViewCompany companyId={id || ""} />     
      <Link href="/">Voltar para a Página Inicial.</Link>
    </>
  );
}
