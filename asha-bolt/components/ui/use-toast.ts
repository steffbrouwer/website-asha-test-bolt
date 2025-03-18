// Reexport from an existing toast library or implement your own
import { useToast as useToastOriginal } from "@/hooks/use-toast";
export { useToast };

function useToast() {
  return useToastOriginal();
}