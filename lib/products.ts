import { createClient } from "@/lib/supabase/client";

export interface Product {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  status?: 'active' | 'inactive';
}

export class ProductsService {
  private supabase = createClient();

  async uploadImage(file: File): Promise<{ url: string | null; error: string | null }> {
    try {
      // Get current user
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        return { url: null, error: 'Usuário não autenticado' };
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`; // Store in user's folder

      console.log('Uploading image to path:', filePath);

      const { error } = await this.supabase.storage
        .from('products')
        .upload(filePath, file);

      if (error) {
        console.error('Error uploading image:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return { url: null, error: error.message };
      }

      const { data: { publicUrl } } = this.supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      console.log('Successfully uploaded image:', publicUrl);
      return { url: publicUrl, error: null };
    } catch (error) {
      console.error('Unexpected error uploading image:', error);
      return { url: null, error: 'Erro inesperado ao fazer upload da imagem' };
    }
  }

  async createProduct(productData: CreateProductData): Promise<{ product: Product | null; error: string | null }> {
    try {
      // Get current user
      console.log('Getting current user...');
      const { data: { user } } = await this.supabase.auth.getUser();
      console.log('Current user:', user);
      
      if (!user) {
        console.error('No authenticated user found');
        return { product: null, error: 'Usuário não autenticado' };
      }

      console.log('User ID:', user.id);
      console.log('User email:', user.email);

      console.log('Creating product with data:', {
        user_id: user.id,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image_url: productData.image_url || null,
        status: productData.status || 'active',
      });

      const { data, error } = await this.supabase
        .from('products')
        .insert([{
          user_id: user.id,
          name: productData.name,
          description: productData.description,
          price: productData.price,
          image_url: productData.image_url || null,
          status: productData.status || 'active',
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating product - Full error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return { 
          product: null, 
          error: `Erro ao criar produto: ${error.message || 'Erro desconhecido'}` 
        };
      }

      console.log('Successfully created product:', data);
      return { product: data, error: null };
    } catch (error) {
      console.error('Unexpected error creating product:', error);
      return { product: null, error: 'Erro inesperado ao criar produto' };
    }
  }

  async getProducts(): Promise<{ products: Product[] | null; error: string | null }> {
    try {
      // Get current user
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        return { products: null, error: 'Usuário não autenticado' };
      }

      console.log('Fetching products for user ID:', user.id);

      const { data, error } = await this.supabase
        .from('products')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        return { products: null, error: error.message };
      }

      console.log('Successfully fetched products:', data?.length || 0, 'products');
      return { products: data || [], error: null };
    } catch (error) {
      console.error('Unexpected error fetching products:', error);
      return { products: null, error: 'Erro inesperado ao buscar produtos' };
    }
  }

  async updateProduct(id: string, productData: Partial<CreateProductData>): Promise<{ product: Product | null; error: string | null }> {
    try {
      // Get current user
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        return { product: null, error: 'Usuário não autenticado' };
      }

      console.log('Updating product:', id, 'for user:', user.id);

      const { data, error } = await this.supabase
        .from('products')
        .update({
          ...productData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user.id) // Ensure user can only update their own products
        .select()
        .single();

      if (error) {
        console.error('Error updating product:', error);
        return { product: null, error: error.message };
      }

      console.log('Successfully updated product:', data);
      return { product: data, error: null };
    } catch (error) {
      console.error('Unexpected error updating product:', error);
      return { product: null, error: 'Erro inesperado ao atualizar produto' };
    }
  }

  async deleteProduct(id: string): Promise<{ error: string | null }> {
    try {
      // Get current user
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) {
        return { error: 'Usuário não autenticado' };
      }

      console.log('Deleting product:', id, 'for user:', user.id);

      const { error } = await this.supabase
        .from('products')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id); // Ensure user can only delete their own products

      if (error) {
        console.error('Error deleting product:', error);
        return { error: error.message };
      }

      console.log('Successfully deleted product:', id);
      return { error: null };
    } catch (error) {
      console.error('Unexpected error deleting product:', error);
      return { error: 'Erro inesperado ao excluir produto' };
    }
  }

  // Public method to fetch all active products (no authentication required)
  async getAllActiveProducts(): Promise<{ products: Product[] | null, error: string | null }> {
    try {
      console.log('Fetching all active products for public display');

      const { data, error } = await this.supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all products:', error);
        return { products: null, error: error.message };
      }

      console.log('Successfully fetched all products:', data?.length || 0);
      return { products: data || [], error: null };
    } catch (error) {
      console.error('Unexpected error fetching all products:', error);
      return { products: null, error: 'Erro inesperado ao carregar produtos' };
    }
  }

  // Public method to fetch a single product by ID (no authentication required)
  async getProductById(id: string): Promise<{ product: Product | null, error: string | null }> {
    try {
      console.log('Fetching product by ID:', id);

      const { data, error } = await this.supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('status', 'active')
        .single();

      if (error) {
        console.error('Error fetching product by ID:', error);
        return { product: null, error: error.message };
      }

      console.log('Successfully fetched product:', data);
      return { product: data, error: null };
    } catch (error) {
      console.error('Unexpected error fetching product by ID:', error);
      return { product: null, error: 'Erro inesperado ao carregar produto' };
    }
  }
}

export const productsService = new ProductsService();
