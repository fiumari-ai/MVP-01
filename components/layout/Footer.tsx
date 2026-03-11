import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-border py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-brand-orange font-bold text-lg">Operator Path</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-brand-muted">
            <Link href="/privacy" className="hover:text-brand-text transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand-text transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-brand-text transition-colors">
              Contact
            </Link>
          </div>
          <p className="text-brand-muted text-sm">
            © {new Date().getFullYear()} Operator Path. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
