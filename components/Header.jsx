import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { cartItems } = useCart();

  return (
    <header className="glass-panel flex-between" style={{ padding: '16px 24px', position: 'sticky', top: 0, zIndex: 100, borderRadius: '0 0 var(--radius-lg) var(--radius-lg)', borderTop: 'none', marginBottom: '24px' }}>
      <Link href="/" className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
        Appscrip PLP
      </Link>
      <Link href="/cart" className="btn-outline flex-center" style={{ gap: '8px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        Cart <span style={{ background: 'var(--accent-gradient)', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{cartItems.length}</span>
      </Link>
    </header>
  );
}