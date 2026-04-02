import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | Appscrip Store</title>
      </Head>
      <div className="container">
        <Header />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px' }}>404</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Oops! The page you are looking for doesn&apos;t exist.
          </p>
          <Link href="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}