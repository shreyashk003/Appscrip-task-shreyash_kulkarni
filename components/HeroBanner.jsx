export default function HeroBanner() {
  return (
    <div style={{ padding: '80px 24px', textAlign: 'center', background: 'var(--accent-gradient)', borderRadius: 'var(--radius-lg)', margin: '0 0 32px 0', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-glow)' }}>
      <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)', animation: 'spin 25s linear infinite' }}></div>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '16px', position: 'relative', zIndex: 1, letterSpacing: '-1px' }}>
        Welcome to Appscrip Store 🚀
      </h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.9, position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto', fontWeight: 300 }}>
        Discover premium products with a state-of-the-art shopping experience.
      </p>
    </div>
  );
}