import React, { useState } from "react"
import axios from "axios"
import { createOvermindSSR } from "overmind"
import { config } from "../../../../overmind"
import Header from "../../../../components/Header"

const SearchType = (props) => {
  const { user } = props.pageProps

  if (!user) {
    return null
  } else {
    return (
      <div>
        <Header />
        <div>Hi, {user.name.first}</div>
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

  overmind.state.page = "Search Type"

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

export default SearchType
