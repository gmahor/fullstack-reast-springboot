import { PageHeading } from "../page/PageHeading";
import { ProductListings } from "../product/ProductListings";

import { useLoaderData } from "react-router-dom";
import apiClient from "../../api/apiClient";

export const Home = () => {
  const products = useLoaderData();
  // const location = useLocation();
  // const username = location.state;
  // const pathname = location.pathname;
  // console.log(username);
  // console.log(pathname);

  return (
    <>
      <div className="max-w-[1152px] mx-auto px-6 py-8">
        <PageHeading title="Explore Eazy Stickers!">
          Add a touch of creativity to your space with our wide range of fun and
          unique stickers. Perfect for any occasion!
        </PageHeading>
        <ProductListings products={products} />
      </div>
    </>
  );
};

export async function productsLoader() {
  try {
    const response = await apiClient.get("/products");
    return response.data;
  } catch (error) {
    throw new Response(
      error.message || "Failed to fetch products. Please try again.",
      { status: error.status || 500 }
    );
  }
}
