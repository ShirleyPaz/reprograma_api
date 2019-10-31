const professoras = require('../models/professoras.json');
const fs = require('fs');

exports.get = (req, res) => {
    console.log(req.url);
    const professorasExibir = professoras.map(professora => {
        delete professora.cpf
        return professora
    })

    // const professorasExibir = []

    // for (let i = 0; i < professoras.length; i++) {
    //     const newProfessora = {
    //         id: professoras[i].id,
    //         nome: professoras[i].nome,
    //         especialidade: professoras[i].especialidade,
    //         signo: professoras[i].signo,
    //     }
    //     professorasExibir.push(newProfessora);
    // }

    res.status(200).send(professorasExibir)
}

exports.post = (req, res) => {
    const { id, nome, especialidade, signo, cpf } = req.body;
    professoras.push({ id, nome, especialidade, signo, cpf });
    fs.writeFile('./src/models/professoras.json', JSON.stringify(professoras), 'utf-8', function (err) {
        if(err) {
            res.status(500).send({message: err})
        }
    })
    res.status(201).send(professoras);
}

exports.getById = (req, res) => {
    const id = req.params.id;
    const professora = professoras.find(prof => prof.id == id);
    delete professora.cpf
    res.status(200).send(professora)
}