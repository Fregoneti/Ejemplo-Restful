/*let db = require('mysql');
let pool = db.createPool({
    host: 'ec2-54-170-100-209.eu-west-1.compute.amazonaws.com',
    user: 'jambjduecdvnkk',
    password: '2739959c666baad461cd3a8358c559e5a333ffda8e9376513ae3cbd5af608a8e',
    port: 5432,
    database: 'tienda'
})
*/
let db=require('pg')
let pool = db.Pool({
    host: 'ec2-54-170-100-209.eu-west-1.compute.amazonaws.com',
    user: 'jambjduecdvnkk',
    password: '2739959c666baad461cd3a8358c559e5a333ffda8e9376513ae3cbd5af608a8e',
    port: 5432,
    database: 'tienda'
})

const getAllClients = (request, response) => {
    let apiKey=request.headers.apikey;
    if(!watchDog(apiKey)){
        response.status(403).json("Prohibido, ApiKey no válida, so hacker");
        return;
    }
    let q = "SELECT * FROM clientes";
    pool.query(q, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
            response.status(200).json(result);
        }
    })
}
const getAllClientsByPage = (request, response) => {
    //el request
    let apiKey=request.headers.apikey;
    if(!watchDog(apiKey)){
        response.status(403).json("Prohibido, ApiKey no válida, so hacker");
        return;
    }
    let page = request.params.page;
    if (!page || page < 1) {
        page = 1;
    }
    let nperpage = 10;
    let offset = (page - 1) * nperpage;
    let q = `SELECT * FROM clientes LIMIT ${offset},${nperpage}`;
    console.log(q)
    pool.query(q, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
            response.status(200).json(result);
        }
    })
}
const getClientById = (request, response) => {
    let apiKey=request.headers.apikey;
    if(!watchDog(apiKey)){
        response.status(403).json("Prohibido, ApiKey no válida, so hacker");
        return;
    }
    let id = request.params.id;
    let q = `SELECT * FROM clientes WHERE id=${id}`;
    pool.query(q, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log(result);
            response.status(200).json(result);
        }
    })
}

const createClient = (request, response) => {
    let apiKey=request.headers.apikey;
    if(!watchDog(apiKey)){
        response.status(403).json("Prohibido, ApiKey no válida, so hacker");
        return;
    }
    let name = '';
    if (request.body.name) {
        name = request.body.name;
    }
    //let datos=JSON.parse(request.body);
    let q = `INSERT INTO clientes (name) VALUES ('${name}')`;
    pool.query(q, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            //console.log(result);
            response.status(200).json(result.insertId);
        }
    })
}
const updateClient = (request, response) => {
    let apiKey=request.headers.apikey;
    if(!watchDog(apiKey)){
        response.status(403).json("Prohibido, ApiKey no válida, so hacker");
        return;
    }
    let id = request.params.id;
    let name = '';
    if (request.body.name) {
        name = request.body.name;
    }
    //let datos=JSON.parse(request.body);
    let q = `UPDATE clientes SET name = '${name}' WHERE id=${id}`;
    pool.query(q, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            //console.log(result);
            response.status(200).json(`Usuario ${id} actualizado`);
        }
    })
}
const deleteClient = (request, response) => {
    let apiKey=request.headers.apikey;
    if(!watchDog(apiKey)){
        response.status(403).json("Prohibido, ApiKey no válida, so hacker");
        return;
    }
    let id = request.params.id;
    
    let q = `DELETE FROM clientes WHERE id=${id}`;
    pool.query(q, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            //console.log(result);
            response.status(200).json(`Usuario ${id} eliminado`);
        }
    })
}

const watchDog=(apiKey)=>{
    console.log(apiKey)
    if(apiKey!="Franciscodelosrios.es"){
        return false 
    }else{
        return true;
    }
}

module.exports = {
    getAllClients,
    getAllClientsByPage,
    getClientById,
    createClient,
    updateClient,
    deleteClient
}