export default function Footer() {
  return (
    <footer className="flex-center" style={{ padding: '32px 24px', marginTop: '64px', borderTop: 'var(--glass-border)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
      &copy; {new Date().getFullYear()} Appscrip PLP. Crafted with a premium UI approach.
    </footer>
  );
}