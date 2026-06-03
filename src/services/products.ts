import { supabase } from "../lib/supabase";
import { Product } from "../types/product";

// Mengambil semua produk
export async function getProducts(): Promise<{ data: Product[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.from("products").select("*");
    
    if (error) {
      console.error("Supabase Error (getProducts):", error.message);
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error("Terjadi kesalahan sistem:", error);
    return { data: null, error };
  }
}

// Mengambil satu produk berdasarkan ID
export async function getProductById(id: string | string[]): Promise<{ data: Product | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(`Supabase Error (getProductById - ${id}):`, error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error: any) {
    console.error("Terjadi kesalahan sistem:", error);
    return { data: null, error };
  }
}