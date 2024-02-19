import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ConfirmModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            &#10005;
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default ConfirmModal;



{/* <CustomModal isOpen={isOpen} onClose={closeModal}>
    <div className="text-center">
      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
        Are you sure you want to delete this product?
      </h3>
      <div className="flex justify-center gap-4">
        <Button className="bg-red-500 text-white px-3 py-2 rounded-lg" onClick={() => setIsOpen(false)}>
          {"Yes, I'm sure"}
        </Button>
        <Button color="gray" onClick={() => setIsOpen(false)}>
          No, cancel
        </Button>
      </div>
    </div>
</CustomModal> */}
