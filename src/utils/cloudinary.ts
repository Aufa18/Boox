/**
 * Mengoptimalkan URL gambar dari Cloudinary secara on-the-fly.
 * @param url URL gambar asli dari database
 * @param width Lebar gambar yang diinginkan (default: 500)
 * @param height Tinggi gambar (opsional, jika diisi akan otomatis crop c_fill)
 */
export function getOptimizedImageUrl(url: string, width: number = 500, height?: number): string {
    // Jika URL kosong atau bukan dari Cloudinary, langsung kembalikan URL asli
    if (!url || !url.includes('cloudinary')) return url;
  
    // Optimasi dasar: kualitas otomatis (q_auto) & format modern otomatis seperti WebP (f_auto)
    let transformations = `q_auto,f_auto,w_${width}`;
  
    // Jika parameter tinggi diisi, tambahkan efek crop fill agar gambar presisi (misal untuk kotak 1:1)
    if (height) {
      transformations += `,h_${height},c_fill`;
    }
  
    return url.replace('/upload/', `/upload/${transformations}/`);
  }