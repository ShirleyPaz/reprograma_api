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

exports.getBooks = (req, res) => {
    const id = req.params.id
    // res.status(200).send(alunas.find(aluna => aluna.id == id).livros.reduce((livrosLidos, livro) => {
    //     if (livro.leu === "true") {
    //         livrosLidos.push(livro.titulo);
    //     }
    //     return livrosLidos;
    // }, [])
    const livrosLidos = []
    alunas.find(aluna => aluna.id == id).livros.map(livro => {
        if (livro.leu === "true") {
            livrosLidos.push(livro.titulo);
        }
    })
    res.status(200).send(livrosLidos);
}

