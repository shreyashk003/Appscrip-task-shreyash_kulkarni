import { useRouter } from "next/router";
import { getProducts } from "../../lib/api";
import { useCart } from "../../context/CartContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  if (!product) return <p>Product not found</p>;

  return (
    <>
      <Header />
      <div className="p-4 flex flex-col md:flex-row gap-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/2 object-cover"
        />
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="my-2">{product.description}</p>
          <p className="text-xl font-semibold">₹{product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-4 py-2 mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <Footer />
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