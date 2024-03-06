import EditCompany from "@/components/specifics/EditCompany";
import Head from "next/head";
import { useRouter } from "next/router";

export default function View() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Atualização de dados | Núcleo Ambiental</title>
      </Head>
      <EditCompany companyId={id || ""} />     
    </>
  );
}