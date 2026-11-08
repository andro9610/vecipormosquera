import { toDbKey } from "./keys";
import { supabase } from "./supabaseClient";

const EDGE_FUNCTION_NAME = "increment-counter";

export const fetchCounter = async (name: string): Promise<number> => {
  const { data, error } = await supabase
    .from("counters")
    .select("quantity")
    .eq("counter_name", toDbKey(name))
    .maybeSingle();

  if (error) throw error;

  return data?.quantity ?? 0;
};

const incrementOnTable = async (counterName: string): Promise<number> => {
  const { data: current, error: readError } = await supabase
    .from("counters")
    .select("quantity")
    .eq("counter_name", counterName)
    .maybeSingle();

  if (readError) throw readError;

  if (!current) {
    const { data: inserted, error: insertError } = await supabase
      .from("counters")
      .insert({ counter_name: counterName, quantity: 1 })
      .select("quantity")
      .single();

    if (insertError) throw insertError;

    return inserted.quantity;
  }

  const { data: updated, error: updateError } = await supabase
    .from("counters")
    .update({ quantity: current.quantity + 1 })
    .eq("counter_name", counterName)
    .select("quantity");

  if (updateError) throw updateError;

  if (!updated?.length) {
    throw new Error(`UPDATE bloqueado: las policies RLS impiden escribir ${counterName}`);
  }

  return updated[0].quantity;
};

const incrementViaEdgeFunction = async (counterName: string): Promise<number> => {
  const { data, error } = await supabase.functions.invoke<{ quantity?: number; error?: string }>(
    EDGE_FUNCTION_NAME,
    { body: { counterName } },
  );

  if (error) throw error;

  if (data?.error) throw new Error(data.error);

  if (typeof data?.quantity !== "number") throw new Error("La Edge Function no devolvió quantity");

  return data.quantity;
};

export const incrementCounter = async (name: string): Promise<number> => {
  const counterName = toDbKey(name);

  try {
    return await incrementOnTable(counterName);
  } catch {
    return incrementViaEdgeFunction(counterName);
  }
};
