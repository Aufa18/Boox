import { getProducts } from "@/services/products";
import { Product } from "@/types/product";
import { useCallback, useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Menggunakan useCallback agar fungsi ini aman dimasukkan ke dalam dependency array jika diperlukan di masa depan
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    const { data, error: fetchError } = await getProducts();
    
    if (fetchError) {
      setError(fetchError.message);
    } else if (data) {
      setProducts(data);
    }
    
    setIsLoading(false);
  }, []);

  // Ambil data otomatis saat pertama kali komponen yang memakai hook ini di-render
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Kembalikan objek berisi state dan fungsi pemicu ulang
  return { 
    products, 
    isLoading, 
    error, 
    refetch: fetchProducts 
  };
}