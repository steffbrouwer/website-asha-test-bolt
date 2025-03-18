import { useState } from "react";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    setToasts((current) => [...current, props]);
    // Remove toast after 5 seconds
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t !== props));
    }, 5000);
  };

  return { toast, toasts };
}