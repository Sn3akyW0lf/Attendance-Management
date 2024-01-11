const Grocery = require('../models/grocery');

exports.postAddItem = async (req, res, next) => {
    try {
        console.log(req.body);
        const body = req.body;
        const name = body.item;
        const desc = body.item_desc;
        const price = body.item_price;
        const qty = body.item_qty;

        const item = new Grocery(null, name, desc, price, qty);

        const data = await Grocery.create({
            name: name,
            description: desc,
            price: price,
            quantity: qty
        });

        res.status(201).json({newItemDetails: data});

    } catch (err) {
        console.log(err);
    }
};

exports.getItems = async (req, res, next) => {
    try{
        const data = await Grocery.findAll();
        res.status(201).json({allItemDetails: data});
    } catch (err) {
        console.log(err);
    }
};

exports.postDeleteItem = async (req, res, next) => {
    try{
        console.log(req.params);
        let item = await Grocery.findByPk(req.params.itmId);
        console.log(item);
        
        res.status(201).json({deletedItem: item});
        return item.destroy();
    } catch (err) {
        console.log(err);
    }
}