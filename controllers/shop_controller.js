const data = {};
data.shoes = require('../models/shoes.json');

const getAllShoes = (req, res) => {
    res.json(data.shoes)
}

const getShoeDetails = (req, res) => {
    const shoe = data.shoes.find(shoe => shoe.id === parseInt(req.params.id))
    console.log(shoe)
    if (!shoe) {
        return res.status(400).json({"message": "Item not found"})
    }
    res.json(shoe);
}

module.exports = {getAllShoes, getShoeDetails}