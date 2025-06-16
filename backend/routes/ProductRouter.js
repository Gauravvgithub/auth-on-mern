const ensureAuthenticated = require("../middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticated, (request, response) => {
    // console.log('---logged in user details---', request.user)
  response.status(200).json([
    {
      name: "mobile",
      price: 10000,
    },
    {
      name: "mobile",
      price: 20000,
    },
  ]);
});

module.exports = router;
