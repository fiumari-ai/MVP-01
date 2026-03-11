'use client'

import { updateName } from './actions'

export default function NameForm({ userId, currentName }: { userId: string; currentName: string }) {
  return (
    <form
      action={async (formData: FormData) => {
        const name = formData.get('name') as string
        await updateName(userId, name)
      }}
      className="flex gap-2"
    >
      <input
        name="name"
        defaultValue={currentName}
        placeholder="Your name"
        className="flex-1 bg-brand-dark border border-brand-border hover:border-brand-orange/40 focus:border-brand-orange text-brand-text placeholder:text-brand-muted rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
      />
      <button
        type="submit"
        className="bg-brand-surface border border-brand-border hover:border-brand-orange text-brand-text hover:text-brand-orange font-medium text-sm px-4 py-2.5 rounded-xl transition-all"
      >
        Save
      </button>
    </form>
  )
}
