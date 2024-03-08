import ViewCompany from "@/components/specifics/ViewCompany";
import Head from "next/head";
import { useRouter } from "next/router";

export default function View() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Empreendimento | Núcleo Ambiental</title>
      </Head>
      <ViewCompany companyId={id || ""} />     
    </>
  );
}
