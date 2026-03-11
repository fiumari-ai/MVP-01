import { createClient } from '@/lib/supabase/server'
import ProLock from '@/components/pro/ProLock'
import type { CommunityPost } from '@/types'
import { Heart, MessageCircle } from 'lucide-react'

const SEED_POSTS: CommunityPost[] = [
  {
    id: '1',
    author_name: 'Marcus T.',
    author_initials: 'MT',
    content: 'Just closed my third reorder with Midwest Wholesale. Their new category (kitchen tools) has some gems — BSR under 8k on multiple SKUs. If anyone is sourcing Home & Kitchen, worth a look.',
    tag: 'Supplier Find',
    timestamp: '2 hours ago',
    likes: 14,
  },
  {
    id: '2',
    author_name: 'Jessica R.',
    author_initials: 'JR',
    content: 'Used Prompt A2 from the pack to rewrite my bullet points on a slow-moving product. CTR went from 0.4% to 1.1% in 10 days. One change at a time really does work.',
    tag: 'Product Win',
    timestamp: '5 hours ago',
    likes: 22,
  },
  {
    id: '3',
    author_name: 'Daniel K.',
    author_initials: 'DK',
    content: "Question for the group — anyone had luck with health & beauty suppliers accepting first orders under $200? Working within a tight budget and don't want to overcommit before validating.",
    tag: 'Question',
    timestamp: '8 hours ago',
    likes: 7,
  },
  {
    id: '4',
    author_name: 'Sarah M.',
    author_initials: 'SM',
    content: 'First sale update: shipped 20 units two weeks ago, sold 17 at $34.99 each. Net margin came out to about 28% after all fees. First cycle done. Reordering 40 units this week.',
    tag: 'Product Win',
    timestamp: '1 day ago',
    likes: 38,
  },
  {
    id: '5',
    author_name: 'Ryan P.',
    author_initials: 'RP',
    content: 'Heads up — SouthStar Distribution just updated their Amazon seller policy. They now require a state resale certificate to open an account. Adjust your outreach accordingly.',
    tag: 'Supplier Find',
    timestamp: '1 day ago',
    likes: 19,
  },
  {
    id: '6',
    author_name: 'Alicia W.',
    author_initials: 'AW',
    content: 'The 15-minute protocol from Module 9 is underrated. Ran it on the last Product Finder drop — eliminated 3 products in under an hour and moved straight to sourcing on 2 that passed. Saves a lot of analysis paralysis.',
    tag: 'General',
    timestamp: '2 days ago',
    likes: 11,
  },
]

const TAG_COLORS: Record<string, string> = {
  'Supplier Find': 'text-brand-orange bg-brand-orange/10',
  'Product Win': 'text-brand-green bg-brand-green/10',
  'Question': 'text-blue-400 bg-blue-400/10',
  'General': 'text-brand-muted bg-brand-surface border border-brand-border',
}

export default async function CommunityPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user!.id)
    .single()

  const isPro = profile?.subscription_status === 'active'

  if (!isPro) {
    return (
      <div className="p-6">
        {/* Blurred preview */}
        <div className="relative">
          <div className="space-y-4 blur-sm pointer-events-none select-none mb-6">
            {SEED_POSTS.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-brand-surface border border-brand-border rounded-xl p-4">
                <p className="text-brand-muted text-sm">{post.content}</p>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-brand-dark/80 rounded-2xl p-6 text-center max-w-sm">
              <p className="text-white font-semibold mb-1">Join the community</p>
              <p className="text-brand-muted text-sm">Upgrade to Pro to access peer intelligence.</p>
            </div>
          </div>
        </div>
        <ProLock
          featureName="Community"
          description="A peer intelligence network for active Amazon resellers. Share supplier finds, product wins, and get specific answers from operators at the same stage as you."
        />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Community</h1>
        <p className="text-brand-muted text-sm mt-1">Peer intelligence from active operators</p>
      </div>

      <div className="space-y-4">
        {SEED_POSTS.map((post) => (
          <div key={post.id} className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-brand-orange/20 transition-all">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center text-brand-orange text-xs font-bold shrink-0">
                {post.author_initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-brand-text text-sm font-semibold">{post.author_name}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TAG_COLORS[post.tag]}`}>
                    {post.tag}
                  </span>
                  <span className="text-brand-muted text-xs ml-auto">{post.timestamp}</span>
                </div>
              </div>
            </div>

            <p className="text-brand-text text-sm leading-relaxed">{post.content}</p>

            <div className="flex items-center gap-4 mt-4 text-brand-muted text-xs">
              <button className="flex items-center gap-1.5 hover:text-brand-orange transition-colors">
                <Heart size={13} />
                {post.likes}
              </button>
              <button className="flex items-center gap-1.5 hover:text-brand-orange transition-colors">
                <MessageCircle size={13} />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
