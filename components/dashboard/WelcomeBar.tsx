interface WelcomeBarProps {
  name: string | null
  lessonsCompleted: number
}

export default function WelcomeBar({ name, lessonsCompleted }: WelcomeBarProps) {
  const displayName = name || 'Operator'

  const subtext =
    lessonsCompleted === 0
      ? 'Start with Module 1 — it takes less than 20 minutes.'
      : `You've completed ${lessonsCompleted} ${lessonsCompleted === 1 ? 'lesson' : 'lessons'}. Keep the momentum going.`

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white">
        Hey {displayName},{' '}
        <span className="text-brand-orange">ready to make your first sale?</span>
      </h1>
      <p className="text-brand-muted mt-1 text-sm sm:text-base">{subtext}</p>
    </div>
  )
}
