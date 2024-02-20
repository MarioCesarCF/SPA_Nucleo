import EditCompany from "@/components/specifics/EditCompany";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function View() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Atualização de dados | Núcleo Ambiental</title>
      </Head>
      <Link href="/"><i className="fa-solid fa-house" title="Botão para voltar à página principal."></i></Link>
      <EditCompany companyId={id || ""} />     
    </>
  );
}