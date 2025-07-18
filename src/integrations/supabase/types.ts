export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      content_flags: {
        Row: {
          created_at: string
          description: string | null
          flagged_by: string | null
          id: string
          profile_id: string
          reason: string
          resolved_at: string | null
          resolved_by: string | null
          status: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          flagged_by?: string | null
          id?: string
          profile_id: string
          reason: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          flagged_by?: string | null
          id?: string
          profile_id?: string
          reason?: string
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
        }
        Relationships: []
      }
      drink_logs: {
        Row: {
          created_at: string
          drink_id: string
          guest_id: string
          id: string
          timestamp: string
          user_id: string
        }
        Insert: {
          created_at?: string
          drink_id: string
          guest_id: string
          id?: string
          timestamp?: string
          user_id: string
        }
        Update: {
          created_at?: string
          drink_id?: string
          guest_id?: string
          id?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "drink_logs_drink_id_fkey"
            columns: ["drink_id"]
            isOneToOne: false
            referencedRelation: "drinks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drink_logs_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "wedding_guests"
            referencedColumns: ["id"]
          },
        ]
      }
      drinks: {
        Row: {
          category: string
          created_at: string
          emoji: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          emoji: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          emoji?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      goals: {
        Row: {
          created_at: string
          current_progress: number | null
          description: string | null
          end_date: string | null
          id: string
          start_date: string
          status: string
          target_type: string
          target_value: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_progress?: number | null
          description?: string | null
          end_date?: string | null
          id?: string
          start_date?: string
          status?: string
          target_type: string
          target_value?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_progress?: number | null
          description?: string | null
          end_date?: string | null
          id?: string
          start_date?: string
          status?: string
          target_type?: string
          target_value?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          content: string
          created_at: string
          id: string
          mood_after: number | null
          mood_before: number | null
          tags: string[] | null
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          mood_after?: number | null
          mood_before?: number | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          mood_after?: number | null
          mood_before?: number | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      mood_entries: {
        Row: {
          created_at: string
          date: string
          energy_level: number
          id: string
          mood_score: number
          notes: string | null
          sleep_hours: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          energy_level: number
          id?: string
          mood_score: number
          notes?: string | null
          sleep_hours?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          energy_level?: number
          id?: string
          mood_score?: number
          notes?: string | null
          sleep_hours?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          timezone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          timezone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          timezone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wedding_guests: {
        Row: {
          avatar_url: string | null
          created_at: string
          drink_count: number
          id: string
          last_drink_timestamp: string | null
          name: string
          qr_code_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          drink_count?: number
          id?: string
          last_drink_timestamp?: string | null
          name: string
          qr_code_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          drink_count?: number
          id?: string
          last_drink_timestamp?: string | null
          name?: string
          qr_code_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
