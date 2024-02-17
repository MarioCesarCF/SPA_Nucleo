import "bootstrap/dist/css/bootstrap.min.css";
import Layout from '@/components/commons/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@/components/commons/UserContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}
