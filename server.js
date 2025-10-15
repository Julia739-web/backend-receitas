import Fastify from 'fastify';
import pkg from 'pg';

const server = Fastify();

const { Pool } = pkg;
const pool = new Pool({
    user: 'local',
    host: 'localhost',
    database: 'receitas',
    password: '12345',
    port: 5432,
});

server.get('/usuarios', async (req, reply) => {
    const retorno = await pool.query('SELECT * FROM usuarios');
    try {
        reply.status(200).send(retorno.rows);
    } catch (error) {
        reply.status(500).send({ error: 'Erro carregando os usuários'})
    }
})

server.post('/usuarios', async (req, reply) => {
    const { nome, senha ,email, telefone } = req.body;
    try {
        const retorno = await pool.query(
            'INSERT INTO usuarios (nome, senha, email, telefone) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, senha, email, telefone]
        );
        reply.status(200).send(retorno.rows[0]);
    } catch (e) {
        reply.status(500).send({ error: e.message })
}
})

server.get('/categorias', async (req, reply) => {
    try {
        const resultado = await pool.query('SELECT * FROM categorias')
        reply.status(200).send(resultado.rows)
    } catch (err) {
        reply.status(500).send({ error: err.message })
    }
})

server.post('/categorias', async (req, reply) => {
    const { nome } = req.body;

    try {
        const resultado = await pool.query(
            'INSERT INTO CATEGORIAS (nome) VALUES ($1) RETURNING *',
            [nome]
        )
        reply.status(200).send(resultado.rows[0])
    } catch (e) {
        reply.status(500).send({ error: e.message })
    }
})



server.listen({
    port: 3000,
    host: '0.0.0.0'
})

//categorias
server.get('/categorias', async (req, reply) => {
    try {
        const resultado = await pool.query('SELECT * FROM categorias')
        reply.status(200).send(resultado.rows)
    } catch (err) {
        reply.status(500).send({ error: err.message })
    }
})

server.post('/categorias', async (req, reply) => {
    const { nome } = req.body;

    try {
        const resultado = await pool.query(
            'INSERT INTO CATEGORIAS (nome) VALUES ($1) RETURNING *',
            [nome]
        )
        reply.status(200).send(resultado.rows[0])
    } catch (e) {
        reply.status(500).send({ error: e.message })
    }
})

server.delete('/usuarios', async(req, reply) =>{
    const id = req.params.id
    try{
        await pool.query('DELETE FROM USUARIOS WHERE id=$1', [id])

    } catch (err) {

    }
})