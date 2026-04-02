import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000,
});

// 🔥 In-memory cache
let cache = {
  products: null,
  categories: null,
  time: 0,
};

const CACHE_DURATION = 60 * 1000; // 60 sec

// ✅ GET ALL PRODUCTS (with caching)
export const getProducts = async () => {
  const now = Date.now();

  if (cache.products && now - cache.time < CACHE_DURATION) {
    return cache.products;
  }

  try {
    const res = await api.get("/products?limit=100");

    const mappedProducts = res.data.products.map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      rating: p.rating,
      category: p.category,
      thumbnail: p.thumbnail,
      stock: p.stock || 0,
    }));

    cache.products = mappedProducts;
    cache.time = now;

    return mappedProducts;
  } catch {
    return [];
  }
};

// ✅ GET SINGLE PRODUCT
export const getProductById = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch {
    return null;
  }
};

// ✅ GET CATEGORIES
export const getCategories = async () => {
  const now = Date.now();

  if (cache.categories && now - cache.time < CACHE_DURATION) {
    return cache.categories;
  }

  try {
    const res = await api.get("/products/categories");

    cache.categories = res.data;
    cache.time = now;

    return res.data;
  } catch {
    return [];
  }
};