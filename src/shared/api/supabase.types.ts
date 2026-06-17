export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      cart_items: {
        Row: {
          cart_id: number | null
          id: number
          product_id: number | null
          quantity: number | null
          updated_at: string | null
        }
        Insert: {
          cart_id?: number | null
          id?: number
          product_id?: number | null
          quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          cart_id?: number | null
          id?: number
          product_id?: number | null
          quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string | null
          id: number
          user_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          user_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "carts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      categories: {
        Row: {
          icon: string | null
          id: number
          name: string
        }
        Insert: {
          icon?: string | null
          id?: number
          name: string
        }
        Update: {
          icon?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          base_price: number
          created_at: string
          discount_amount: number | null
          id: number
          order_id: number
          product_id: number
          product_name: string | null
          quantity: number
          total_price: number | null
        }
        Insert: {
          base_price: number
          created_at?: string
          discount_amount?: number | null
          id?: number
          order_id: number
          product_id: number
          product_name?: string | null
          quantity: number
          total_price?: number | null
        }
        Update: {
          base_price?: number
          created_at?: string
          discount_amount?: number | null
          id?: number
          order_id?: number
          product_id?: number
          product_name?: string | null
          quantity?: number
          total_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          delivery_address: string | null
          delivery_time_from: string | null
          delivery_time_to: string | null
          delivery_type: number
          discount_amount: number | null
          dont_ring_intercom: boolean | null
          flat: number | null
          floor: number | null
          id: number
          order_comment: string | null
          payer_name: string | null
          payer_number: string
          payment_type: number
          ready_by_from: string | null
          ready_by_to: string | null
          subtotal_amount: number | null
          total_amount: number | null
          user_id: number
        }
        Insert: {
          created_at?: string
          delivery_address?: string | null
          delivery_time_from?: string | null
          delivery_time_to?: string | null
          delivery_type: number
          discount_amount?: number | null
          dont_ring_intercom?: boolean | null
          flat?: number | null
          floor?: number | null
          id?: number
          order_comment?: string | null
          payer_name?: string | null
          payer_number: string
          payment_type: number
          ready_by_from?: string | null
          ready_by_to?: string | null
          subtotal_amount?: number | null
          total_amount?: number | null
          user_id: number
        }
        Update: {
          created_at?: string
          delivery_address?: string | null
          delivery_time_from?: string | null
          delivery_time_to?: string | null
          delivery_type?: number
          discount_amount?: number | null
          dont_ring_intercom?: boolean | null
          flat?: number | null
          floor?: number | null
          id?: number
          order_comment?: string | null
          payer_name?: string | null
          payer_number?: string
          payment_type?: number
          ready_by_from?: string | null
          ready_by_to?: string | null
          subtotal_amount?: number | null
          total_amount?: number | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      products: {
        Row: {
          carbs: number | null
          categoryId: number | null
          description: string | null
          fats: number | null
          id: number
          img: string | null
          kcal: number | null
          name: string | null
          price: number | null
          proteins: number | null
          weight: string | null
        }
        Insert: {
          carbs?: number | null
          categoryId?: number | null
          description?: string | null
          fats?: number | null
          id?: number
          img?: string | null
          kcal?: number | null
          name?: string | null
          price?: number | null
          proteins?: number | null
          weight?: string | null
        }
        Update: {
          carbs?: number | null
          categoryId?: number | null
          description?: string | null
          fats?: number | null
          id?: number
          img?: string | null
          kcal?: number | null
          name?: string | null
          price?: number | null
          proteins?: number | null
          weight?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          address: string | null
          created_at: string
          flat: number | null
          floor: number | null
          id: number
          name: string
          number: string | null
          user_id: number
          username: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          flat?: number | null
          floor?: number | null
          id?: number
          name: string
          number?: string | null
          user_id: number
          username?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          flat?: number | null
          floor?: number | null
          id?: number
          name?: string
          number?: string | null
          user_id?: number
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_order: {
        Args: { items_data: Json; order_data: Json; p_discount_amount?: number }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
