import Head from "next/head";
import Link from "next/link";

export default function NotFound () {
  return (
    <div>
      <Head>
        <title>404 | MárioCesarDev</title>
      </Head>
      <h1>404</h1>
      <div>
        <p>Ooops... Não conseguimos encontrar essa página!</p>
        <span>Clique no botão abaixo para ser redirecionado à Página Inicial.</span>
      </div>
      <Link href="/">
        Ir para a Página Inicial.
      </Link>
    </div>
  )
}