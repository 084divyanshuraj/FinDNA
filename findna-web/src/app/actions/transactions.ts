'use server'

import { supabase } from '@/lib/supabase'

export async function addTransaction(data: {
  type: string,
  amount: number,
  category?: string,
  userId: string,
  userEmail?: string
}) {
  try {
    // 1. Ensure user exists in our public "User" table
    const { data: userData, error: userError } = await supabase
      .from('User')
      .upsert({
        id: data.userId,
        email: data.userEmail || 'unknown@findna.com',
        password: 'logged-in-via-auth' // Dummy password to satisfy NOT NULL constraint
      }, { onConflict: 'id' });

    if (userError) {
      console.error('Error syncing user:', userError);
    }

    // 2. Create the transaction with a client-generated ID
    const { data: txData, error: txError } = await supabase
      .from('Transaction')
      .insert([{
        id: crypto.randomUUID(), // Generate ID here to bypass DB constraint
        userId: data.userId,
        type: data.type,
        amount: data.amount,
        category: data.category || (data.type === 'income' ? 'Income' : null)
      }]);

    if (txError) throw txError;

    return { success: true, transaction: txData }
  } catch (error) {
    console.error('Error adding transaction:', error)
    return { success: false, error: 'Failed to add transaction' }
  }
}
