import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Header from "../../../components/Header"
import axios from "axios"
import { createOvermindSSR } from "overmind"
import { config } from "../../../overmind"

const Charts = (props) => {
  const router = useRouter()
  let { period, start } = router.query
  start = parseInt(start) || 0
  const previous = start - 1
  const next = start + 1
  const { user } = props.pageProps

  if (!user) {
    return null
  } else {
    return (
      <div>
        <Header />

        <nav className={`subnav ${period}`}>
          <Link href={`/charts/[period]`} as={`/charts/weekly/`}>
            <a className={`${period === "weekly" && "active"}`}>Weekly</a>
          </Link>
          <Link href={`/charts/[period]`} as={`/charts/monthly/`}>
            <a className={`${period === "monthly" && "active"}`}>Monthly</a>
          </Link>
          <Link href={`/charts/[period]`} as={`/charts/yearly/`}>
            <a className={`${period === "yearly" && "active"}`}>Yearly</a>
          </Link>
        </nav>

        <div>Hi, {user.name.first}</div>
        <p>Charts: {start}</p>
        <div className="pagination">
          {start > 0 && (
            <Link
              href={`/charts/[period]/[start]`}
              as={`/charts/${period}/${previous}`}
            >
              <a>Prev</a>
            </Link>
          )}
          <Link
            href={`/charts/[period]/[start]`}
            as={`/charts/${period}/${next}`}
          >
            <a>Next</a>
          </Link>
        </div>
        <style jsx>{`
          .subnav {
            margin: 1rem 0;
          }
          .subnav a + a {
            margin-left: 1rem;
          }
          .active {
            font-weight: bold;
          }
          .pagination a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    )
  }
}

export async function getServerSideProps({ query }) {
  // If we want to produce some mutations we do so by instantiating
  // an Overmind SSR instance, do whatever datafetching is needed and
  // change the state directly. We return the mutations performed with
  // "hydrate"
  const overmind = createOvermindSSR(config)

  overmind.state.page = "Charts"
  overmind.state.charts.period = query.period

  const user = await axios
    .get("https://randomuser.me/api/")
    .then((res) => res.data.results[0])

  return {
    props: {
      mutations: overmind.hydrate(),
      user: user,
      period: query.period,
    },
  }
}

export default Charts
