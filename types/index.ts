export interface Profile {
  id: string
  name: string | null
  email: string
  stripe_customer_id: string | null
  subscription_status: 'free' | 'active' | 'canceled' | 'past_due'
  subscription_id: string | null
  created_at: string
}

export interface LessonProgress {
  id: string
  user_id: string
  module_slug: string
  lesson_slug: string
  completed_at: string
}

export interface Streak {
  id: string
  user_id: string
  current_streak: number
  longest_streak: number
  last_active_date: string | null
}

export interface Supplier {
  id: string
  name: string
  category: string
  country: string
  city: string
  contact_email: string
  website: string
  min_order: number
  verified_at: string
  tags: string[]
  notes: string
}

export interface Prompt {
  id: string
  title: string
  category: 'Listing Optimization' | 'Product Research' | 'Supplier Outreach' | 'Pricing' | 'Operations'
  use_case: string
  prompt_text: string
}

export interface ProductPick {
  id: string
  name: string
  category: string
  week_of: string
  demand_score: number
  margin_estimate: string
  avg_price: number
  competition_level: 'Low' | 'Medium' | 'High'
  why_now: string
  source_hint: string
}

export interface CommunityPost {
  id: string
  author_name: string
  author_initials: string
  content: string
  tag: 'Supplier Find' | 'Product Win' | 'Question' | 'General'
  timestamp: string
  likes: number
}
