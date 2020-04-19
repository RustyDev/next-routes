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
          <a className={state.page === "Index" && "active"}>Home page</a>
        </Link>
        <Link href="/about">
          <a className={state.page === "About" && "active"}>About Page</a>
        </Link>
        <Link href={`/charts/[period]/`} as={`/charts/${state.charts.period}`}>
          <a className={state.page === "Charts" && "active"}>Charts</a>
        </Link>
      </nav>
      <style jsx>{`
        nav {
          margin-bottom: 1rem;
        }
        nav a + a {
          margin-left: 1rem;
        }
        .active {
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

export default Header
