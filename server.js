const express = require("express")
const cors = require("cors")
const pesquisas = require("./dados.json")

function autoIncrement() {
    return Number(pesquisas[pesquisas.length - 1].id) + 1
}

const cadastrarUso = (req, res) => {
    const pesquisa = req.body
    pesquisa.id = autoIncrement()
    pesquisas.push(pesquisa)
    res.status(201).json(pesquisa)
}

const listarUsos = (req, res) => {
    res.send(pesquisas)
}

const atualizarUso = (req, res) => {
    const id = req.params.id
    const dados = req.body
    let status = 0

    pesquisas.forEach((pesquisas) => {
        if (pesquisas.id == id) {
            status = 1
            pesquisas.sistema = dados.sistema
            pesquisas.tipo = dados.tipo
            pesquisas.finalidade = dados.finalidade
            pesquisas.tecnologia = dados.tecnologia
            pesquisas.nivel_risco = dados.nivel_risco
            pesquisas.possui_revisao_humana = dados.possui_revisao_humana
        }
    })
    if (status == 1) {
        res.send("Uso atualizado com sucesso")
    } else {
        res.status(404).send("Uso não encontrado")
    }
}

const deletarUso = (req, res) => {
    const id = req.params.id
    let status = 0

    pesquisas.forEach((pesquisa, indice) => {
        if (pesquisa.id == id) {
            status = 1
            pesquisas.splice(indice, 1)
        }
    })
    if (status == 1) {
        res.send("Uso excluido com sucesso")
    } else {
        res.status(404).send("Uso não encontrado")
    }
}

const buscarUso = (req, res) => {
    const id = req.params.id
    const nivel_risco = req.params.nivel_risco
    const tipo = req.params.tipo
    let status = 0
    const resposta = []

    pesquisas.forEach((pesquisa) => {
        if (pesquisa.id == id) {
            status = 1
            resposta.push(pesquisa)
        }
    })
    pesquisas.forEach((pesquisa) => {
        if (pesquisa.nivel_risco == nivel_risco) {
            status = 1
            resposta.push(pesquisa)
        }
    })
    pesquisas.forEach((pesquisa, indice) => {
        if (pesquisa.tipo == tipo) {
            status = 1
            resposta.push(pesquisa)
        }
    })
    if (status == 1) {
        res.send(resposta)
    } else {
        res.status(404).send("Uso não encontrado")
    }
}

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const porta = 3000

app.get('/pesquisas/', listarUsos)
app.get('/pesquisas/:id', buscarUso)
app.get('/pesquisas/tipo/:tipo', buscarUso)
app.get('/pesquisas/risco/:nivel_risco', buscarUso)
app.post('/pesquisas/', cadastrarUso)
app.put('/pesquisas/:id', atualizarUso)
app.delete('/pesquisas/:id', deletarUso)

app.listen(porta, () => {
    console.log(`Servidor respondendo em http://localhost:${porta}`)
})