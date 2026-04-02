import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Head from "next/head";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Head>
        <title>Your Cart | Appscrip Store</title>
        <meta name="description" content="Review your shopping cart at Appscrip Store." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <Header />
        
        <div className="animate-fade-in" style={{ padding: '0px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '32px', letterSpacing: '-1px' }}>Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 24px auto', color: 'var(--text-secondary)', opacity: 0.5 }}>
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Your cart is empty</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Looks like you haven't added anything yet.</p>
              <Link href="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
              <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cartItems.map(item => (
                  <div key={item.id} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: '1' }}>
                      <div style={{ background: '#fff', padding: '8px', borderRadius: 'var(--radius-sm)', width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                        <img src={item.thumbnail} alt={item.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                      </div>
                      <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>{item.title}</h2>
                        <p style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>₹{item.price} <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal', fontSize: '0.9rem' }}>x {item.quantity}</span></p>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="btn-danger"
                        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ flex: '0 0 320px' }}>
                <div className="glass-panel" style={{ padding: '32px', position: 'sticky', top: '100px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px', borderBottom: 'var(--glass-border)', paddingBottom: '16px' }}>Order Summary</h3>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                    <span>Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: 'var(--text-secondary)' }}>
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', borderTop: 'var(--glass-border)', paddingTop: '16px' }}>
                    <span>Total</span>
                    <span className="gradient-text">₹{total.toFixed(2)}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <button className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}>
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={clearCart}
                      className="btn-outline"
                      style={{ width: '100%' }}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}