import React, { useState } from "react"
import { useRouter } from "next/router"
import { Link } from "../routes"
import Header from "../components/Header"
import axios from "axios"
import { createOvermindSSR } from "overmind"
import { config } from "../overmind"

const Charts = (props) => {
  const { user, period, start } = props.pageProps
  const previous = start - 1
  const next = start + 1

  if (!user) {
    return null
  } else {
    return (
      <div>
        {/* <Header /> */}

        <nav className={`subnav ${period}`}>
          <Link route="charts" period="weekly">
            <a className={`${period === "weekly" && "active"}`}>Weekly</a>
          </Link>
          <Link route="charts" period="monthly">
            <a className={`${period === "monthly" && "active"}`}>Monthly</a>
          </Link>
          <Link route="charts" period="yearly">
            <a className={`${period === "yearly" && "active"}`}>Yearly</a>
          </Link>
        </nav>

        <div>Hi, {user.name.first}</div>
        <p>Current Page: {start}</p>
        <div className="pagination">
          {start > 0 && (
            <Link route="charts" period={period} start={previous}>
              <a>Prev</a>
            </Link>
          )}
          {start <= 0 && <a className="disabled">Prev</a>}
          <Link route="charts" period={period} start={next}>
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
          .disabled {
            opacity: 0.5;
            color: #000;
            text-decoration: none;
          }
        `}</style>
      </div>
    )
  }
}

Charts.getInitialProps = async ({ query }) => {
  // If we want to produce some mutations we do so by instantiating
  // an Overmind SSR instance, do whatever datafetching is needed and
  // change the state directly. We return the mutations performed with
  // "hydrate"

  console.log(query)
  const overmind = createOvermindSSR(config)

  overmind.state.page = "Charts"
  overmind.state.charts.period = query.period

  const user = await axios
    .get("https://randomuser.me/api/")
    .then((res) => res.data.results[0])

  let { period, start } = query
  start = parseInt(start) || 0
  return {
    mutations: overmind.hydrate(),
    user: user,
    period,
    start,
  }
}

export default Charts
