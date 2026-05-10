/** Minimal Supabase types for typed queries — extend after `supabase gen types`. */

export type AppRole = "jamaah" | "mitra" | "cabang" | "owner";

export interface Database {
  public: {
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: AppRole;
          full_name: string | null;
          phone: string | null;
          branch_name: string | null;
          company_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role: AppRole;
          full_name?: string | null;
          phone?: string | null;
          branch_name?: string | null;
          company_name?: string | null;
        };
        Update: {
          role?: AppRole;
          full_name?: string | null;
          phone?: string | null;
          branch_name?: string | null;
          company_name?: string | null;
          updated_at?: string;
        };
      };
      jamaah: {
        Row: {
          id: string;
          user_id: string;
          display_name: string;
          email: string | null;
          phone: string | null;
          package_name: string | null;
          payment_status: string;
          documents: Record<string, unknown> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          display_name: string;
          email?: string | null;
          phone?: string | null;
          package_name?: string | null;
          payment_status?: string;
          documents?: Record<string, unknown> | null;
        };
        Update: Partial<Database["public"]["Tables"]["jamaah"]["Insert"]>;
      };
      mitra: {
        Row: {
          id: string;
          user_id: string;
          company_name: string;
          contact_email: string | null;
          contact_phone: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company_name: string;
          contact_email?: string | null;
          contact_phone?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["mitra"]["Insert"]>;
      };
      cabang: {
        Row: {
          id: string;
          user_id: string;
          branch_display_name: string;
          city: string | null;
          office_phone: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          branch_display_name: string;
          city?: string | null;
          office_phone?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["cabang"]["Insert"]>;
      };
    };
  };
}
