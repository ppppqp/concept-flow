import React, { ReactElement } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';
const Modal = ({ isOpen, onClose, children }: {isOpen: boolean, onClose: () => void, children: ReactElement} ) => {
  if (!isOpen) return null; // Early return if not open
  console.log(children)
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-500 bg-opacity-75 transition-opacity duration-300 ease-in-out">
      <div className="min-h-32 relative my-40 mx-auto p-4 w-full max-w-sm rounded-lg shadow-lg bg-white">
        <XCircleIcon
          className="w-4 h-4 text-red-600 hover:text-red-500 absolute top-3 right-2.5 cursor-pointer"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;