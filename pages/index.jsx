import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import HeroBanner from "../components/HeroBanner";
import { getProducts } from "../lib/api";
import { useState, useMemo } from "react";
import useDebounce from "../hooks/useDebounce";
import Head from "next/head";

export default function Home({ products }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const [page, setPage] = useState(1);

  const limit = 9; // Strictly 3x3 layout
  const debouncedSearch = useDebounce(search, 300);

  // Categories
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category))).sort()];

  // Filtering & Sorting
  const processedProducts = useMemo(() => {
    let filtered = products
      .filter(p => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
      .filter(p => category === "all" ? true : p.category === category)
      .filter(p => inStockOnly ? p.stock > 0 : true)
      .filter(p => p.rating >= minRating);

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [products, debouncedSearch, category, inStockOnly, minRating, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(processedProducts.length / limit);
  const paginatedProducts = processedProducts.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <>
      <Head>
        <title>Appscrip Store | Premium Electronic Gadgets & Clothing</title>
        <meta name="description" content="Shop premium electronics, men's and women's clothing, and jewelry with Appscrip Store. Discover top-rated products with our advanced filtering system." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <Header />
        <HeroBanner />

        {/* SEARCH + FILTER CONTROLS */}
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              style={{ width: '100%', paddingLeft: '48px' }}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>

          <div style={{ flex: '0 0 180px' }}>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              style={{ width: '100%', cursor: 'pointer', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px top 50%', backgroundSize: '12px auto' }}
            >
              <option value="all">Categories: All</option>
              {categories.filter(c => c !== "all").map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: '0 0 200px' }}>
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
              style={{ width: '100%', cursor: 'pointer', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px top 50%', backgroundSize: '12px auto' }}
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          {/* SIDEBAR FILTERS */}
          <div style={{ flex: '0 0 250px' }} className="mobile-hidden">
            <ProductFilters 
              inStockOnly={inStockOnly} 
              setInStockOnly={(nextVal) => { setInStockOnly(nextVal); setPage(1); }}
              minRating={minRating}
              setMinRating={(nextVal) => { setMinRating(nextVal); setPage(1); }}
            />
          </div>

          {/* PRODUCTS GRID */}
          <div style={{ flex: '1 1 min0', minWidth: '0' }}>
            <div className="grid-3 animate-fade-in">
              {paginatedProducts.length === 0 ? (
                <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center', gridColumn: '1 / -1' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px auto', color: 'var(--text-secondary)', opacity: 0.5 }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>No matching products found. Try adjusting your filters.</p>
                  <button onClick={() => { setSearch(""); setCategory("all"); setInStockOnly(false); setMinRating(0); setSortBy("default"); setPage(1); }} className="btn-outline" style={{ marginTop: '24px' }}>Clear All Filters</button>
                </div>
              ) : (
                paginatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))
              )}
            </div>

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="flex-center animate-fade-in" style={{ marginTop: '40px', gap: '16px' }}>
                <button
                  disabled={page === 1}
                  onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setPage(page - 1); }}
                  className="btn-outline"
                >
                  Prev
                </button>

                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Page <span style={{ color: 'var(--text-primary)' }}>{page}</span> of {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setPage(page + 1); }}
                  className="btn-outline"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .mobile-hidden { display: none !important; }
        }
      `}} />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const products = await getProducts();
    return { props: { products } };
  } catch {
    // Avoid noisy production console output; render an empty state instead.
    return { props: { products: [] } };
  }
}