import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Header from "../../../components/Header"
import Items from "../../../components/Items"
import axios from "axios"

const Charts = (props) => {
  const router = useRouter()
  let { start } = router.query
  start = parseInt(start) || 0
  const previous = start - 1
  const next = start + 1
  const { user } = props.pageProps
  const period = "weekly"

  console.log("next", next)

  if (!user) {
    return null
  } else {
    return (
      <div>
        <Header />
        <Items />
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
          .pagination a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    )
  }
}

export async function getServerSideProps({ query }) {
  console.log(query)
  const user = await axios
    .get("https://randomuser.me/api/")
    .then((res) => res.data.results[0])
  return {
    props: {
      user: user,
    },
  }
}

export default Charts
