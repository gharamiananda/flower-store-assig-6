import { Tabs } from "@chakra-ui/react";
import ProductList from "./components/ProductList";
import TabsRender from "components/tabs";

const ProductTable = () => {
  return (
    <div>
     

      <div className="mt-5  h-full  grid h-full grid-cols-1 gap-5 md:grid-cols-1">

        <ProductList />
      </div>



    </div>
  );
};

export default ProductTable;
