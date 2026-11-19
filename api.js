//Integrante do grupo techcore: Vinicius
//teste
import express from 'express';
import { clientes } from './clientes.js';


const app = express();
const port = 3000;


app.use(express.json());


app.get('/clientes', (req, res) => {
  res.status(200).json(clientes);
});


app.get('/clientes/:cnpj', (req, res) => {
  const cnpj = String(req.params.cnpj);
  const cliente = clientes.find(p => p.cnpj === cnpj);
  if (cliente) {
    res.status(200).json(cliente);
  } else {
    res.status(404).json({ mensagem: `Produto não encontrado com id ${cnpj} `});
  }
});


app.get('/clientes/Vcompra/maior', (req, res) => {
    const conta = Math.max(...clientes.map(v => v.vcompras))
    res.status(200).json(conta)
})


app.get('/clientes/grupo/:grupo', (req, res) => {
    const grupo = req.params.grupo.toLowerCase();


    const clientesGrupo = clientes.filter(
        c => c.grupo.toLowerCase() === grupo
    );


    if (clientesGrupo.length > 0) {
        res.status(200).json(clientesGrupo);
    } else {
        res.status(404).json({
            mensagem: `Nenhum cliente encontrado no grupo ${req.params.grupo}`
        });
    }
});

app.put('/clientes/:cpnj', (req, res) => {
  const id = String(req.params.cpnj);
  const { fornecedor, cnpj, grupo, vcompras } = req.body;
  const index = clientes.findIndex(c => c.cnpj === id);




  if (index === -1) {
return res.status(404).json({ mensagem: `Cliente com ID ${id} não encontrado para atualização `});
  }




  if (!fornecedor || !cnpj || !grupo || vcompras === undefined) {
    return res.status(400).json ({
      mensagem: `Todos os campos (fornecedor, cnpj, grupo, vcompras) devem ser informados.`
    });
  }


  clientes[index] = {
    fornecedor,
    cnpj,
    grupo,
    vcompras
  };


  res.status(200).json(clientes[index]);
});



app.post('/clientes', (req, res) => {
  const { fornecedor, cnpj, grupo, vcompras } = req.body;


  if (!fornecedor || !cnpj || !grupo || vcompras === undefined) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
  }


  const novoCliente = {
    fornecedor,
    cnpj: String(cnpj),
    grupo,
    vcompras: parseFloat(vcompras)
  };


  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

app.delete('/clientes/:cnpj',(req,res) => {
    const cnpj = String(req.params.cnpj);
    const Index = clientes.findIndex(p=> p.cnpj === cnpj)


    if (Index === -1) {
        return res.status(404).json({mensagem:`cliente com ${cnpj}nao encontrado para exclusao`})
    }
    const [ clienteremovido] = clientes.splice(Index,1);


    res.status (200).json ({mensagem:`cliente com o ${cnpj} removido com sucesso`})
})


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Acessar http://localhost:${port}/clientes para ver os produtos`);
});