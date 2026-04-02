import { useRouter } from "next/router";
import { getProducts } from "../../lib/api";
import { useCart } from "../../context/CartContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import Head from "next/head";

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  if (!product) return (
    <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <Header />
      <h1 style={{ fontSize: '2rem' }}>Product not found</h1>
      <button onClick={() => router.push('/')} className="btn-primary" style={{ marginTop: '20px' }}>Back to Home</button>
      <Footer />
    </div>
  );

  return (
    <>
      <Head>
        <title>{product.title} | Appscrip Store</title>
        <meta name="description" content={product.description} />
      </Head>
      <div className="container">
        <Header />
        <div className="glass-panel animate-fade-in" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', padding: '40px', margin: '40px 0' }}>
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: 'var(--radius-md)' }}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>{product.title}</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{product.description}</p>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: 'auto' }}>
              ₹{product.price}
            </div>
            <button
              onClick={() => addToCart(product)}
              className="btn-primary"
              style={{ marginTop: '16px', padding: '16px', fontSize: '1.2rem' }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

// SSR for product details
export async function getServerSideProps({ params }) {
  try {
    const products = await getProducts();
    const product = products.find((p) => p.id.toString() === params.id);

    return {
      props: { product: product || null },
    };
  } catch (err) {
    console.error(err);
    return { props: { product: null } };
  }
}