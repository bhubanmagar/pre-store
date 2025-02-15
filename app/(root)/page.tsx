import { Button } from "@/components/ui/button";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const HomePage = async () => {
  await delay(2000);
  return <Button>HomePage</Button>;
};

export default HomePage;

