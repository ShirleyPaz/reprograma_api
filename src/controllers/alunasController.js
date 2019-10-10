const alunas = require('../models/alunas.json');

exports.get = (req, res) => {
    console.log(req.url);
    res.status(200).send(alunas)
}

exports.getById = (req, res) => {
    const id = req.params.id
    if (id < 1 || id > 17) {
        res.redirect(301, "https://www.uol.com.br/");
    }
    console.log(id);
    res.status(200).send(alunas.find(aluna => aluna.id == id))
}

exports.getBooks = (req, res) => {
    const id = req.params.id
    const aluna = alunas.find(aluna => aluna.id == id);

    if (!aluna) {
        res.send('Não encontrei essa garota');
    }
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

exports.getAlunasSp = (req, res) => {
    console.log('ENTROU NO ALUNAS SP')
    const listaNasceuSP = alunas.filter( aluna => aluna.nasceuEmSp == "true" ).reduce((listaNomes, item) => {
        listaNomes.push(item.nome);
        return listaNomes;
    }, [])
    res.status(200).send(listaNasceuSP);
}

