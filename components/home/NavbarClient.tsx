'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { urlForImage } from '@/lib/sanity.image'

type LinkType = {
  _key: string
  label: string
  url: string
}

type NavbarType = {
  logo: any
  links: LinkType[]
}

const NavbarClient = ({ navbar }: { navbar: NavbarType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { logo, links } = navbar || {}

  /* 🔒 Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  /* ✅ Close menu AFTER navigation */
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-black max-w-full overflow-x-hidden">
        <div className="flex items-center justify-between py-4 px-6">
          <div className="w-32">
            {logo && (
              <Image
                src={urlForImage(logo).url()}
                alt="Logo"
                width={200}
                height={80}
                className="w-full h-auto"
              />
            )}
          </div>

          {/* MENU / X BUTTON */}
          <div className=''>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex items-center justify-center w-12 h-12"
              aria-label="Toggle menu"
            >
              <div className="relative w-8 h-8">
                <Menu
                  className={`absolute inset-0  text-white transition-all duration-500 ease-in-out
                  ${isMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}
                `}
                  strokeWidth={4}
                />
                <X
                  className={`absolute inset-0 text-white transition-all duration-500 ease-in-out
                  ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}
                `}
                  strokeWidth={4}
                />
              </div>
            </button>
          </div>

        </div>
      </nav>

      {/* FULLSCREEN OVERLAY MENU */}
      <div
        className={`fixed inset-0 z-40 bg-black max-w-full overflow-x-hidden
  ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
`}
      >
        {/* offset for navbar height */}
        <div className="pt-20 lg:pt-30 flex flex-col text-center h-full space-y-6">
          {links?.map((link) => (
            <Link
              key={link._key}
              href={link.url}
              className="text-white text-3xl"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default NavbarClient