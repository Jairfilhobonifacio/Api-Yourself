import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  type?: 'success' | 'error';
}

export default function Toast({ message, onClose, type = 'success' }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>{message}</div>
  );
}
