let express = require("express");
let app = express();
let bodyParser  = require("body-parser");
let db=require("./database");
let port=3000;

app.use(bodyParser.urlencoded({ limit:'50mb',extended: true }));
app.use(bodyParser.json({ limit:'50mb',extended: true }));

let router=express.Router();

router.get('/clientes',db.getAllClients);
router.get('/clientes/page/:page',db.getAllClientsByPage);
router.get('/clientes/:id',db.getClientById);

router.post('/clientes',db.createClient);
router.put('/clientes/:id',db.updateClient);

router.delete('/clientes/:id',db.deleteClient);

app.use(router);
app.listen(process.env.PORT || port,()=>{
    console.log("Arrancando en http://localhost:3000");
})