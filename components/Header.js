import Link from "next/link"
import React from "react"
import { useOvermind } from "../overmind"

function Header() {
  const { state } = useOvermind()

  return (
    <div>
      <h1>{state.page}</h1>
      <nav>
        <Link href="/">
          <a>Home page</a>
        </Link>
        <Link href="/about">
          <a>About Page</a>
        </Link>
        <Link href={`/charts/[period]/`} as={`/charts/weekly`}>
          <a>Charts</a>
        </Link>
      </nav>
      <style jsx>{`
        nav {
          margin-bottom: 1rem;
        }
        nav a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  )
}

export default Header
