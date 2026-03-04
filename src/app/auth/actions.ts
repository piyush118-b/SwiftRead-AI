'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        redirect('/auth/login?error=Email and password are required')
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        redirect('/auth/login?error=' + encodeURIComponent(error.message))
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (!email || !password || !confirmPassword) {
        redirect('/auth/signup?error=All fields are required')
    }

    if (password !== confirmPassword) {
        redirect('/auth/signup?error=Passwords do not match')
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        // Optional: add a redirect options later for email confirmations
    })

    if (error) {
        redirect('/auth/signup?error=' + encodeURIComponent(error.message))
    }

    // Ideally, redirect to an check-email page, but depending on the user's supabase project settings (if auto confirm is on), we can just go to /onboarding/level or dashboard
    revalidatePath('/', 'layout')
    redirect('/onboarding/level')
}

export async function signout() {
    const supabase = await createClient()
    await supabase.auth.signOut()

    revalidatePath('/', 'layout')
    redirect('/auth/login')
}
