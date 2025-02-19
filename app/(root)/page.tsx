import ProductList from "@/components/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.action";
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  // await delay(2000);
  // return <Button>HomePage</Button>;
  return (
    <>
      <ProductList data={latestProducts} title="New Arriavals" limit={4} />
    </>
  );
};

export default HomePage;

