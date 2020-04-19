const Router = require("nextjs-dynamic-routes")
const router = new Router()
router.add({ name: "index", pattern: "/", page: "index" })
router.add({ name: "about", pattern: "/about", page: "about" })
router.add({
  name: "charts",
  pattern: "/charts/:period/:start?",
  page: "charts",
})
module.exports = router
