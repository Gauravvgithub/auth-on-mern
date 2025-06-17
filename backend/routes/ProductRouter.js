const ensureAuthenticated = require("../middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticated, (request, response) => {
    // console.log('---logged in user details---', request.user)
  response.status(200).json([
    {
      name: "mobile",
      price: 13500,
    },
    {
      name: "mobile",
      price: 25000,
    },
  ]);
});

module.exports = router;
