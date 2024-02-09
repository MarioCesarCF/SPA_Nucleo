import Cliente from '@/components/commons/Cliente'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Coordenadas Geográficas | Núcleo Ambiental</title>
      </Head>
    <main>
        <Cliente />
    </main>
    </>
  )
}
