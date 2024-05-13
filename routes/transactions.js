const express = require('express');
const router = express.Router();
const transactions = require("../controller/transactionController");
const { authenticate } = require("../middleware/authenticate")
const { isAdmin } = require("../middleware/autorization")


router.route("/create")
    .post(authenticate, transactions.createTransaction)

//IS ADMIN
router.route("/read")
    .get(authenticate, isAdmin, transactions.readAllTransaction)

router.route("/transactions")
    .get(authenticate, transactions.readYourTransaction)


router.route("/:id")
    .delete(authenticate, transactions.deleteTransaction)


module.exports = router;