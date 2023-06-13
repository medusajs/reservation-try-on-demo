import {
  CombinationMarkLogo,
  Discord,
  Github,
  Linkedin,
  Twitter,
} from "@/components/icons"

import FooterLink from "../footer/FooterLink"
import Link from "next/link"

const Nav = () => {
  return (
    <nav className="flex items-center justify-center bg-base-light dark:bg-base-dark h-[73px] border-b border-base-light dark:border-base-dark">
      <div className="flex items-center justify-between w-full max-w-7xl px-4">
        <div className="text-icon-base-light dark:text-icon-base-dark">
          <Link href="/">
            <CombinationMarkLogo role="img" />
          </Link>
        </div>
        <div className="text-icon-subtle-light dark:text-icon-subtle-dark flex items-center gap-x-4">
          <FooterLink href="https://www.discord.gg/medusajs">
            <Discord />
          </FooterLink>
          <FooterLink href="https://www.twitter.com/medusajs">
            <Twitter />
          </FooterLink>
          <FooterLink href="https://www.linkedin.com/company/medusajs">
            <Linkedin />
          </FooterLink>
          <FooterLink href="https://www.github.com/medusajs">
            <Github />
          </FooterLink>
        </div>
      </div>
    </nav>
  )
}

export default Nav
