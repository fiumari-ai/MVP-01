import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import type Stripe from 'stripe'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId || session.client_reference_id

        if (!userId) break

        const subscriptionId = session.subscription as string
        let customerId = session.customer as string

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)

        await supabase
          .from('profiles')
          .update({
            stripe_customer_id: customerId,
            subscription_id: subscriptionId,
            subscription_status: subscription.status === 'active' ? 'active' : 'free',
          })
          .eq('id', userId)

        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId

        if (!userId) {
          // Try to find by subscription_id
          const { data } = await supabase
            .from('profiles')
            .select('id')
            .eq('subscription_id', subscription.id)
            .single()

          if (data) {
            await supabase
              .from('profiles')
              .update({
                subscription_status: subscription.status === 'active' ? 'active' : subscription.status,
              })
              .eq('id', data.id)
          }
        } else {
          await supabase
            .from('profiles')
            .update({
              subscription_status: subscription.status === 'active' ? 'active' : subscription.status,
            })
            .eq('id', userId)
        }

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        const { data } = await supabase
          .from('profiles')
          .select('id')
          .eq('subscription_id', subscription.id)
          .single()

        if (data) {
          await supabase
            .from('profiles')
            .update({ subscription_status: 'canceled' })
            .eq('id', data.id)
        }

        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = invoice.subscription as string

        if (subscriptionId) {
          const { data } = await supabase
            .from('profiles')
            .select('id')
            .eq('subscription_id', subscriptionId)
            .single()

          if (data) {
            await supabase
              .from('profiles')
              .update({ subscription_status: 'past_due' })
              .eq('id', data.id)
          }
        }

        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
