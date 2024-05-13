const Transaction = require("../Models/transaction")


module.exports.createTransaction = async (req, res, next) => {
    const { userId, products } = req.body;
    console.log("Produkti-->", products)
    console.log("UserId-->", userId)
    try {
        if (!products || products.length === 0) {
            res.status(400).json({ message: 'No products provided' });
        }
        const totalPrice = totalPriceCalculator(products);

        if (!totalPrice) {
            res.status(500).json({ message: 'We dont have any products' });
        }
        //Mozda ubaciti transaction Id
        const transaction = new Transaction({
            userId: userId,
            products: products.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                totalPrice: item.quantity * item.totalPrice // Assuming item.price is provided
            })),
            timestamp: new Date()
        });

        console.log("Transakcija-->", transaction)

        await transaction.save();

        res.status(201).json({ message: 'Transaction created successfully', transaction });

    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

function totalPriceCalculator(items) {
    let totalPrice = 0;

    items.forEach(item => {
        const ukupno = item.quantity * item.totalPrice;
        totalPrice += ukupno;
    });

    return totalPrice;
}
//samo Admin
module.exports.readAllTransaction = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        if (transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found' });
        }

        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
}

//User-->His own transactions
module.exports.readYourTransaction = async (req, res, next) => {
    const userId = req.body.userId;
    try {
        const transactions = await Transaction.find({ userId: userId });

        if (transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found' });
        }
        console.log("Njegove transakcije--->", transactions)

        res.json(transactions);

    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
}
//Samo admin
module.exports.updateTransaction = async (req, res, next) => {


}

module.exports.deleteTransaction = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deleteTransaction = await Transaction.findByIdAndDelete(id)
        if (!deleteTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ error: 'Failed to delete transaction' });
    }
}
