export type Database = {
  public: {
    Tables: {
      counters: {
        Row: { id: number; counter_name: string; quantity: number };
        Insert: { id?: number; counter_name: string; quantity?: number };
        Update: { id?: number; counter_name?: string; quantity?: number };
        Relationships: [];
      };
      form_sections: {
        Row: { id: number; id_form: number; section_name: string };
        Insert: { id?: number; id_form: number; section_name: string };
        Update: { id?: number; id_form?: number; section_name?: string };
        Relationships: [];
      };
      form_suggestions: {
        Row: { id: number; id_form: number; id_section: number; alias: string; text: string };
        Insert: { id?: number; id_form: number; id_section: number; alias: string; text: string };
        Update: { id?: number; id_form?: number; id_section?: number; alias?: string; text?: string };
        Relationships: [];
      };
      forms: {
        Row: { id: number; form_name: string };
        Insert: { id?: number; form_name: string };
        Update: { id?: number; form_name?: string };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      increment_counter: { Args: { p_counter_name: string }; Returns: number };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
