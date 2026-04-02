import { useCart } from "../context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.3s ease', cursor: 'pointer', position: 'relative' }}>
      
      {/* STOCK BADGE */}
      {product.stock <= 5 && product.stock > 0 && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#EF4444', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '4px 8px', borderRadius: 'var(--radius-full)', zIndex: 10 }}>
          Only {product.stock} left!
        </div>
      )}
      {product.stock === 0 && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--text-secondary)', color: 'var(--bg-primary)', fontSize: '0.75rem', fontWeight: 800, padding: '4px 8px', borderRadius: 'var(--radius-full)', zIndex: 10 }}>
          Out of Stock
        </div>
      )}

      {/* IMAGE */}
      <Link href={`/product/${product.id}`} style={{ display: 'block', marginBottom: '16px', background: '#fff', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
        <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', opacity: product.stock === 0 ? 0.5 : 1 }}
            onError={(e) => {
              e.target.src = "/fallback.png";
            }}
          />
        </div>
      </Link>

      {/* TITLE */}
      <Link href={`/product/${product.id}`}>
        <h2 style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '8px', lineHeight: 1.3, color: 'var(--text-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.title}
        </h2>
      </Link>

      {/* PRICE & RATING */}
      <div className="flex-between" style={{ marginTop: 'auto', marginBottom: '16px' }}>
        <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
          ₹{product.price}
        </p>

        {product.rating && (
          <div className="flex-center" style={{ background: 'rgba(0,0,0,0.05)', padding: '4px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.85rem' }}>
            <span style={{ color: '#FBBF24', marginRight: '4px' }}>★</span> {product.rating}
          </div>
        )}
      </div>

      {/* BUTTON */}
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0 || added}
        className={added ? 'btn-outline' : 'btn-primary'}
        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', border: added ? '1px solid #10B981' : undefined, color: added ? '#10B981' : undefined }}
      >
        {added ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Added to Cart
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </>
        )}
      </button>
    </div>
  );
}