export default function ProductFilters({ inStockOnly, setInStockOnly, minRating, setMinRating }) {
  const ratings = [4, 3, 2, 1];

  return (
    <div className="glass-panel" style={{ padding: '24px', position: 'sticky', top: '100px' }}>
      <h2 style={{ fontWeight: 800, marginBottom: '16px', fontSize: '1.2rem', color: 'var(--accent-primary)', borderBottom: 'var(--glass-border)', paddingBottom: '12px' }}>Filters</h2>
      
      {/* Availability Filter */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Availability</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
          <input 
            type="checkbox" 
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            style={{ accentColor: 'var(--accent-primary)', width: '18px', height: '18px' }} 
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Ratings Filter */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>Minimum Rating</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: minRating === 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
            <input 
              type="radio" 
              name="rating" 
              checked={minRating === 0}
              onChange={() => setMinRating(0)}
              style={{ accentColor: 'var(--accent-primary)', width: '18px', height: '18px' }} 
            />
            <span>Show All</span>
          </label>
          
          {ratings.map(r => (
            <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: minRating === r ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
              <input 
                type="radio" 
                name="rating" 
                checked={minRating === r}
                onChange={() => setMinRating(r)}
                style={{ accentColor: 'var(--accent-primary)', width: '18px', height: '18px' }} 
              />
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: '#FBBF24' }}>{"★".repeat(r)}</span>
                <span style={{ opacity: 0.3 }}>{"★".repeat(5-r)}</span>
                <span style={{ marginLeft: '4px' }}>& Up</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}