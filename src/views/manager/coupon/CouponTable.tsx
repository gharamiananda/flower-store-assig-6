import tableDataComplex from "views/admin/default/variables/tableDataComplex";
// import ProductList from "./components/ProductList";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import { Portal } from '@chakra-ui/react';
import CustomModal from "../../../components/modal";
import PopoverHorizon from "components/popover";
import CouponList from "./components/CouponList";

const CouponTable = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure()



  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <div>
     

      <div className="mt-5  h-full  grid h-full grid-cols-1 gap-5 md:grid-cols-1">
        {/* <ColumnsTable tableData={tableDataColumns} /> */}

        <CouponList />
      </div>



    </div>
  );
};

export default CouponTable;
