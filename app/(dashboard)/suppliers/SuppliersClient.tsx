'use client'

import { useState } from 'react'
import { Search, Filter, ExternalLink, BadgeCheck, RefreshCw } from 'lucide-react'
import suppliersData from '@/data/suppliers.json'
import type { Supplier } from '@/types'
import ProLock from '@/components/pro/ProLock'

const CATEGORIES = ['All', 'Home & Kitchen', 'Health & Beauty', 'Sports & Outdoors', 'Electronics Accessories', 'Pet Supplies', 'Tools & Hardware', 'Toys & Games', 'Office Supplies']

export default function SuppliersClient({ isPro }: { isPro: boolean }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  if (!isPro) {
    return (
      <ProLock
        featureName="Supplier Database"
        description="Access 200+ verified U.S. wholesale suppliers organized by category. Updated every week. Each entry includes contact info, Amazon seller policies, and minimum order data."
      />
    )
  }

  const filtered = (suppliersData as Supplier[]).filter((s) => {
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.notes.toLowerCase().includes(search.toLowerCase())
    const matchesCat = category === 'All' || s.category === category
    return matchesSearch && matchesCat
  })

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Supplier Database</h1>
          <p className="text-brand-muted text-sm mt-1">
            {suppliersData.length} verified suppliers · Updated weekly
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-brand-green text-xs font-medium bg-brand-green/10 border border-brand-green/20 px-3 py-1.5 rounded-lg shrink-0">
          <RefreshCw size={12} />
          Updated weekly
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            placeholder="Search suppliers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-brand-surface border border-brand-border focus:border-brand-orange text-brand-text placeholder:text-brand-muted rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none transition-colors"
          />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-brand-surface border border-brand-border focus:border-brand-orange text-brand-text rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none transition-colors appearance-none cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((supplier) => (
          <div key={supplier.id} className="bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-brand-orange/30 transition-all">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-brand-text font-semibold text-sm">{supplier.name}</h3>
                  <BadgeCheck size={14} className="text-brand-green shrink-0" />
                </div>
                <p className="text-brand-muted text-xs">{supplier.city}</p>
              </div>
              <span className="text-xs font-medium bg-brand-orange/10 text-brand-orange px-2.5 py-1 rounded-lg shrink-0">
                {supplier.category}
              </span>
            </div>

            <p className="text-brand-muted text-xs mb-3 leading-relaxed">{supplier.notes}</p>

            <div className="flex items-center justify-between text-xs text-brand-muted">
              <span>Min. order: <span className="text-brand-text">${supplier.min_order}</span></span>
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${supplier.contact_email}`}
                  className="text-brand-orange hover:text-orange-400 transition-colors"
                >
                  Contact
                </a>
                <span>·</span>
                <a
                  href={`https://${supplier.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-brand-orange hover:text-orange-400 transition-colors"
                >
                  Website
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-brand-muted">No suppliers found for your search.</p>
        </div>
      )}
    </div>
  )
}
