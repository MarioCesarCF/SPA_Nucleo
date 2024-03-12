import Head from "next/head";
import Link from "next/link";
import AdminPage from "@/components/specifics/AdminPage";

export default function AcessoAdm() {
  return (
    <>
      <Head>
        <title>Acesso Adm | Núcleo Ambiental</title>
      </Head>
      <AdminPage />
    </>
  );
}
