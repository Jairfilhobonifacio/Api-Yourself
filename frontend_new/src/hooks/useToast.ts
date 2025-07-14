import { useNotification } from '@/context/NotificationContext';

export const useToast = () => {
  const { addToast } = useNotification();

  const toast = {
    success: (message: string, duration?: number) => 
      addToast(message, 'success', duration),
    
    error: (message: string, duration?: number) => 
      addToast(message, 'error', duration),
    
    info: (message: string, duration?: number) => 
      addToast(message, 'info', duration),
    
    warning: (message: string, duration?: number) => 
      addToast(message, 'warning', duration)
  };

  return toast;
};

export default useToast;
