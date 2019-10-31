const alunas = require('../models/alunas.json');
const fs = require('fs');

exports.get = (req, res) => {
    console.log(req.url);
    res.status(200).send(alunas)
}

exports.post = (req, res) => {
    const { nome, dateOfBirth, nasceuEmSp, id, livros } = req.body;
    alunas.push({ nome, dateOfBirth, nasceuEmSp, id, livros });
    fs.writeFile("./src/models/alunas.json", JSON.stringify(alunas), 'utf-8', function(err) {
        if(err) {
            return res.status(500).send({message: err});
        }
    });

    res.status(201).send(alunas);
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
       return res.send('Não encontrei essa garota');
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

exports.postBooks = (req, res) => {
    const id = req.params.id;
    const aluna = alunas.find(aluna => aluna.id == id);

    if (!aluna) {
        return res.send('Não encontrei essa garota');
    }
  
    // salvar o novo livro
    const { titulo, leu } =  req.body;
    alunas[id - 1].livros.push({ titulo, leu });

    fs.writeFile("./src/models/alunas.json", JSON.stringify(alunas), 'utf-8', function(err) {
        if(err) {
            return res.status(500).send({ message: err })
        }
        console.log('livro salvo com sucesso')
    })

    res.status(200).send(alunas);
}

exports.getAlunasSp = (req, res) => {
    console.log('ENTROU NO ALUNAS SP')
    const listaNasceuSP = alunas.filter(aluna => aluna.nasceuEmSp == "true").reduce((listaNomes, item) => {
        listaNomes.push(item.nome);
        return listaNomes;
    }, [])
    res.status(200).send(listaNasceuSP);
}

exports.getIdade = (req, res) => {
    const id = req.params.id;
    const aluna = alunas.find(e => e.id == id);
    const dataNascimento = new Date(aluna.dateOfBirth);

    const anoDeNasc = aluna.dateOfBirth.split('/')[2];
    const mesDeNasc = aluna.dateOfBirth.split('/')[1];
    const diaDeNasc = aluna.dateOfBirth.split('/')[0];

    // const anoDeNasc = dataNascimento.getFullYear()
    // const mesDeNasc = dataNascimento.getMonth() + 1
    // const diaDeNasc = dataNascimento.getDate()


    console.log(id, aluna, anoDeNasc, mesDeNasc, diaDeNasc)


    function calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc) {
        const now = new Date()
        const anoAtual = now.getFullYear()
        const mesAtual = now.getMonth() + 1
        const hoje = now.getDate()

        let idade = anoAtual - anoDeNasc

        if (mesAtual < mesDeNasc || (mesAtual == mesDeNasc && hoje < diaDeNasc)) {
            idade -= 1
        }
        return idade
    }

    const idade = calcularIdade(anoDeNasc, mesDeNasc, diaDeNasc)
    console.log(typeof idade, 'idade');

    res.status(200).send(`A idade da aluna é ${idade}`);
}

