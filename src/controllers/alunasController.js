const alunas = require('../models/alunas.json');

exports.get = (req, res) => {
    console.log(req.url);
    res.status(200).send(alunas)
}

exports.getById = (req, res) => {
    const id = req.params.id
    console.log(id);
    res.status(200).send(alunas.find(aluna => aluna.id == id))
}