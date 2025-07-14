import React, { createContext, useContext, useCallback, useRef, useState, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastRef = useRef<Toast[]>([]);

  // Atualiza a referência sempre que o estado muda
  toastRef.current = toasts;

  const removeToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'info', duration: number = 5000) => {
    const id = Math.random().toString(36).substring(2, 11);
    const newToast: Toast = { id, message, type, duration };
    
    setToasts(prevToasts => [...prevToasts, newToast]);

    // Remove o toast após a duração especificada
    if (duration > 0) {
      setTimeout(() => {
        // Verifica se o toast ainda existe antes de remover
        if (toastRef.current.some(t => t.id === id)) {
          removeToast(id);
        }
      }, duration);
    }
  }, [removeToast]);

  return (
    <NotificationContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
