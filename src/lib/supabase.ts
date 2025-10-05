import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PurchaseEvent {
  id?: string;
  user_email: string;
  event_type: string;
  value: number;
  currency: string;
  created_at?: string;
  user_agent?: string;
  ip_address?: string;
}

function generateSessionId(): string {
  let sessionId = localStorage.getItem('privacy_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('privacy_session_id', sessionId);
  }
  return sessionId;
}

export async function logEvent(email: string, eventType: 'InitiateCheckout' | 'Purchase'): Promise<boolean> {
  try {
    const sessionId = generateSessionId();
    const uniqueIdentifier = `${sessionId}_${navigator.userAgent}`;

    const { data: existingEvent } = await supabase
      .from('purchase_events')
      .select('id, event_type, created_at')
      .eq('user_email', uniqueIdentifier)
      .maybeSingle();

    if (existingEvent) {
      console.log(`Event already fired for this session: ${existingEvent.event_type}`);
      return false;
    }

    const eventData: PurchaseEvent = {
      user_email: uniqueIdentifier,
      event_type: eventType,
      value: 10.00,
      currency: 'BRL',
      user_agent: navigator.userAgent,
    };

    const { error } = await supabase
      .from('purchase_events')
      .insert([eventData]);

    if (error) {
      console.error(`Error logging ${eventType} event:`, error);
      return false;
    }

    console.log(`${eventType} event logged successfully`);
    return true;
  } catch (error) {
    console.error(`Error in logEvent:`, error);
    return false;
  }
}

export async function logPurchaseEvent(email: string): Promise<boolean> {
  return logEvent(email, 'Purchase');
}

export async function logInitiateCheckoutEvent(email: string): Promise<boolean> {
  return logEvent(email, 'InitiateCheckout');
}
