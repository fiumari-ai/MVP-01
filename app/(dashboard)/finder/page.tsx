import { createClient } from '@/lib/supabase/server'
import ProLock from '@/components/pro/ProLock'
import picksData from '@/data/product-picks.json'
import type { ProductPick } from '@/types'
import { RefreshCw, TrendingUp, DollarSign, Users } from 'lucide-react'

function DemandBar({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-brand-green' : score >= 60 ? 'bg-brand-orange' : 'bg-brand-muted'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-brand-border rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-semibold text-brand-text w-8 text-right">{score}</span>
    </div>
  )
}

function ProductCard({ pick }: { pick: ProductPick }) {
  const competitionColor =
    pick.competition_level === 'Low'
      ? 'text-brand-green bg-brand-green/10'
      : pick.competition_level === 'Medium'
      ? 'text-brand-amber bg-brand-amber/10'
      : 'text-red-400 bg-red-400/10'

  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-brand-orange/30 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-brand-text font-semibold text-sm mb-0.5">{pick.name}</h3>
          <span className="text-brand-orange text-xs font-medium">{pick.category}</span>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-lg shrink-0 ${competitionColor}`}>
          {pick.competition_level} Competition
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <p className="text-brand-muted text-xs mb-1.5">Demand Score</p>
          <DemandBar score={pick.demand_score} />
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <DollarSign size={13} className="text-brand-green shrink-0" />
            <div>
              <span className="text-brand-muted block leading-tight">Est. Margin</span>
              <span className="text-brand-text font-semibold">{pick.margin_estimate}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp size={13} className="text-brand-orange shrink-0" />
            <div>
              <span className="text-brand-muted block leading-tight">Avg. Price</span>
              <span className="text-brand-text font-semibold">${pick.avg_price}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-brand-muted text-xs leading-relaxed mb-2">{pick.why_now}</p>
      <p className="text-brand-muted text-xs">
        <span className="text-brand-text font-medium">Source hint:</span> {pick.source_hint}
      </p>
    </div>
  )
}

export default async function FinderPage() {
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
        <ProLock
          featureName="Product Finder"
          description="Curated weekly product picks with verified demand signals, margin estimates, and sourcing notes. Every product has passed the 5-point filter before being listed."
        />
      </div>
    )
  }

  const picks = picksData as ProductPick[]
  const weeks = [...new Set(picks.map((p) => p.week_of))].sort((a, b) =>
    new Date(b).getTime() - new Date(a).getTime()
  )

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Product Finder</h1>
          <p className="text-brand-muted text-sm mt-1">
            Pre-filtered opportunities with demand signals and margin data
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-brand-green text-xs font-medium bg-brand-green/10 border border-brand-green/20 px-3 py-1.5 rounded-lg shrink-0">
          <RefreshCw size={12} />
          New picks every Monday
        </div>
      </div>

      {weeks.map((week) => {
        const weekPicks = picks.filter((p) => p.week_of === week)
        const date = new Date(week)
        const label = `Week of ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`

        return (
          <div key={week} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-brand-text font-semibold">{label}</h2>
              <span className="bg-brand-orange/10 text-brand-orange text-xs font-semibold px-2.5 py-1 rounded-lg">
                {weekPicks.length} picks
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {weekPicks.map((pick) => (
                <ProductCard key={pick.id} pick={pick} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
