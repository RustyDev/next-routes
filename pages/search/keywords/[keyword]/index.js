import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Header from "../../../../components/Header"
import axios from "axios"
import { createOvermindSSR } from "overmind"
import { config } from "../../../../overmind"

const SearchKeywords = (props) => {
  const { user } = props.pageProps

  if (!user) {
    return null
  } else {
    return (
      <div>
        <Header />
        <div>Hi, {user.name.first}</div>
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

export async function getServerSideProps({ query }) {
  // If we want to produce some mutations we do so by instantiating
  // an Overmind SSR instance, do whatever datafetching is needed and
  // change the state directly. We return the mutations performed with
  // "hydrate"
  const overmind = createOvermindSSR(config)

  overmind.state.page = "Search Keywords"

  const user = await axios
    .get("https://randomuser.me/api/")
    .then((res) => res.data.results[0])

  return {
    props: {
      mutations: overmind.hydrate(),
      user: user,
    },
  }
}

export default SearchKeywords
