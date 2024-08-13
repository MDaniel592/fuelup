import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      // Set a timer to auto-close the modal after 2 seconds
      timer = setTimeout(() => {
        onClose();
      }, 3000);
    }

    // Clear the timer if the modal is closed before the timeout
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded shadow-lg relative">
        {children}
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
