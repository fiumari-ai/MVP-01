import { BookCheck, Trophy, Flame } from 'lucide-react'

interface QuickStatsProps {
  lessonsCompleted: number
  modulesDone: number
  streak: number
}

export default function QuickStats({ lessonsCompleted, modulesDone, streak }: QuickStatsProps) {
  const stats = [
    {
      icon: BookCheck,
      value: lessonsCompleted,
      label: 'Lessons Completed',
      color: 'text-brand-green',
      bg: 'bg-brand-green/10',
    },
    {
      icon: Trophy,
      value: modulesDone,
      label: 'Modules Done',
      color: 'text-brand-orange',
      bg: 'bg-brand-orange/10',
    },
    {
      icon: Flame,
      value: streak,
      label: 'Day Streak',
      color: 'text-brand-amber',
      bg: 'bg-brand-amber/10',
      suffix: streak === 1 ? ' 🔥' : streak > 1 ? ' 🔥' : '',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.label} className="bg-brand-surface border border-brand-border rounded-xl p-4 text-center">
            <div className={`inline-flex p-2 ${stat.bg} rounded-lg mb-2`}>
              <Icon size={18} className={stat.color} />
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}{stat.suffix || ''}
            </div>
            <div className="text-brand-muted text-xs mt-1 leading-tight">{stat.label}</div>
          </div>
        )
      })}
    </div>
  )
}
