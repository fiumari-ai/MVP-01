'use client'

import { useState } from 'react'
import { Copy, Check, Filter } from 'lucide-react'
import promptsData from '@/data/prompts.json'
import type { Prompt } from '@/types'
import ProLock from '@/components/pro/ProLock'
import { createClient as createServerClient } from '@/lib/supabase/server'

const CATEGORIES = ['All', 'Listing Optimization', 'Product Research', 'Supplier Outreach', 'Pricing', 'Operations']

const CATEGORY_COLORS: Record<string, string> = {
  'Listing Optimization': 'text-brand-orange bg-brand-orange/10',
  'Product Research': 'text-brand-green bg-brand-green/10',
  'Supplier Outreach': 'text-blue-400 bg-blue-400/10',
  'Pricing': 'text-purple-400 bg-purple-400/10',
  'Operations': 'text-brand-muted bg-brand-surface',
}

function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(prompt.prompt_text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-brand-orange/30 transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-brand-text font-semibold text-sm">{prompt.title}</h3>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-lg shrink-0 ${CATEGORY_COLORS[prompt.category] || 'text-brand-muted bg-brand-surface'}`}>
          {prompt.category}
        </span>
      </div>

      <p className="text-brand-muted text-xs mb-4 leading-relaxed">{prompt.use_case}</p>

      <div className="bg-brand-dark border border-brand-border rounded-lg p-3 mb-4">
        <p className="text-brand-muted text-xs font-mono leading-relaxed line-clamp-3">
          {prompt.prompt_text}
        </p>
      </div>

      <button
        onClick={handleCopy}
        className="flex items-center gap-2 text-xs font-semibold text-brand-orange hover:text-orange-400 transition-colors"
      >
        {copied ? (
          <>
            <Check size={14} className="text-brand-green" />
            <span className="text-brand-green">Copied!</span>
          </>
        ) : (
          <>
            <Copy size={14} />
            Copy Prompt
          </>
        )}
      </button>
    </div>
  )
}

function PromptsClient({ isPro }: { isPro: boolean }) {
  const [category, setCategory] = useState('All')

  if (!isPro) {
    return (
      <ProLock
        featureName="AI Prompt Pack"
        description="50+ structured AI prompts built specifically for Amazon resellers. Listing optimization, product research, supplier outreach, pricing, and operations. Copy and use in any AI tool."
      />
    )
  }

  const filtered = (promptsData as Prompt[]).filter(
    (p) => category === 'All' || p.category === category
  )

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">AI Prompt Pack</h1>
          <p className="text-brand-muted text-sm mt-1">
            {promptsData.length} prompts across 5 categories
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
              category === c
                ? 'bg-brand-orange text-white'
                : 'bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-orange/40'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  )
}

export default async function PromptsPage() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user!.id)
    .single()
  const isPro = profile?.subscription_status === 'active'
  return <PromptsClient isPro={isPro} />
}
