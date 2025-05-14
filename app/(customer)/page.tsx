import ProductList from "../product-list";
import Featured from "@/components/featured";

export default function Home() {
  return (
    <div className="bg-black text-white">
      <Featured />
      <div className="flex flex-col items-center pt-30  py-10 gap-10">
        <h2 className="font-bold text-4xl">THE BEST PIZZA IN TOWN!</h2>
        <p className="text-2xl">{`"Satisfy your craving for deliciousness with Pizza Hut – the go-to place for tasty pizza!"`}</p>
      </div>
      <ProductList />
    </div>
  );
}
