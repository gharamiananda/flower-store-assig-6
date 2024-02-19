import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 ">
      <div className="bg-gray-700 p-8 rounded shadow-lg">
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

export default CustomModal;
