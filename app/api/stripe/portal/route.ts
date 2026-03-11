import { NextRequest, NextResponse } from 'next/server'
import { createPortalSession } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json()

    if (!customerId) {
      return NextResponse.json({ error: 'Missing customerId' }, { status: 400 })
    }

    const returnUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const url = await createPortalSession(customerId, returnUrl)

    return NextResponse.json({ url })
  } catch (err) {
    console.error('Portal error:', err)
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 })
  }
}
