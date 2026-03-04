import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const next = requestUrl.searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            const { data: profile } = await supabase
                .from('user_profiles')
                .select('onboarding_completed')
                .single()

            const redirectUrl = profile?.onboarding_completed ? next : '/onboarding/personal'
            return NextResponse.redirect(new URL(redirectUrl, requestUrl.origin))
        }

    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(new URL('/auth/auth-error', requestUrl.origin))
}
