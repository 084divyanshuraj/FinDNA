'use server'

import { supabase } from '@/lib/supabase'

export async function addGoal(data: {
  userId: string,
  userEmail?: string,
  name: string,
  type: string,
  category: string,
  targetAmount: number,
  months: number
}) {
  try {
    // 1. Ensure user exists in our public "User" table (Sync if needed)
    await supabase
      .from('User')
      .upsert({
        id: data.userId,
        email: data.userEmail || 'unknown@findna.com',
        password: 'logged-in-via-auth'
      }, { onConflict: 'id' });

    // 2. Create the goal
    const { data: goalData, error: goalError } = await supabase
      .from('Goal')
      .insert([{
        id: crypto.randomUUID(),
        userId: data.userId,
        name: data.name,
        type: data.type,
        category: data.category,
        targetAmount: data.targetAmount,
        months: data.months,
        savedAmount: 0
      }])
      .select()
      .single();

    if (goalError) throw goalError;

    return { success: true, goal: goalData }
  } catch (error) {
    console.error('Error adding goal:', error)
    return { success: false, error: 'Failed to add goal' }
  }
}

export async function getGoals(userId: string) {
  try {
    const { data, error } = await supabase
      .from('Goal')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return { success: true, goals: data }
  } catch (error) {
    console.error('Error fetching goals:', error)
    return { success: false, error: 'Failed to fetch goals' }
  }
}
