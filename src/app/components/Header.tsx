import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-black/80 backdrop-blur-sm p-4 sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-primary transition-colors">
          HoloView
        </Link>
        <div className="space-x-4">
          <Link href="/interview/setup" className="text-white hover:text-primary transition-colors">
            Practice
          </Link>
          <Link href="/schedule" className="text-white hover:text-primary transition-colors">
            Schedule
          </Link>
          <Link href="/resume-builder" className="text-white hover:text-primary transition-colors">
            Resume Builder
          </Link>
          <Link href="/profile" className="text-white hover:text-primary transition-colors">
            Profile
          </Link>
        </div>
      </nav>
    </header>
  )
}

