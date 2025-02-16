import { Button } from "@/components/ui/button";
import sampleData from "@/db/sample-data";
import ProductList from "@/components/product/product-list";
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const HomePage = async () => {
  // await delay(2000);
  // return <Button>HomePage</Button>;
  return (
    <>
      <ProductList data={sampleData.products} title="New Arriavals" limit={4} />
    </>
  );
};

export default HomePage;

