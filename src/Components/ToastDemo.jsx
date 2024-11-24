import React, { useState } from 'react';

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const WarningIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const Toast = ({ message, type, onClose, index }) => {
  const types = {
    success: {
      icon: <CheckIcon />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      textColor: 'text-green-800',
      iconColor: 'text-green-500'
    },
    error: {
      icon: <XIcon />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      textColor: 'text-red-800',
      iconColor: 'text-red-500'
    },
    warning: {
      icon: <WarningIcon />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-500'
    }
  };

  const style = types[type];
  
  const topPosition = `${index * 4 + 1}rem`;

  return (
    <div 
      style={{ top: topPosition }}
      className={`fixed right-4 p-4 rounded-lg border ${style.bgColor} ${style.borderColor} shadow-lg transition-all duration-500 transform translate-x-0 w-80`}
    >
      <div className="flex items-center gap-2">
        <span className={style.iconColor}>{style.icon}</span>
        <span className={`text-sm font-medium ${style.textColor}`}>{message}</span>
        <button
          onClick={onClose}
          className="ml-auto text-gray-400 hover:text-gray-600"
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
};

const ToastDemo = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (type, message) => {
    const newToast = {
      id: Date.now(),
      type,
      message
    };
    setToasts(prevToasts => [...prevToasts, newToast]);
    setTimeout(() => {
      removeToast(newToast.id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={() => showToast('success', 'Success! Operation completed')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Show Success
        </button>
        <button
          onClick={() => showToast('error', 'Error! Something went wrong')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Show Error
        </button>
        <button
          onClick={() => showToast('warning', 'Warning! Check your input')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Show Warn
        </button>
      </div>

      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
          index={index}
        />
      ))}
    </div>
  );
};

export default ToastDemo;