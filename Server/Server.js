import express from 'express';
import cors from "cors";
const app=express();
//import bodyParser from 'body-parser'

const corsOption = {
    origin: "http://localhost:5173"
}
app.use(cors(corsOption));
//app.use(bodyParser.json());

import sql from 'mssql';
import userRoutes from './Users.js';
const sqlConfig = {
  user: 'sa',
  password: 'p@ssw0rd',
  database: 'Winshamil',
  server: 'localhost',
  type: 'mssql',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
  , port: 1433
}



sql.on('error', err => {
    console.log("sql error")
})




sql.connect(sqlConfig).then(pool => {
    // Query
   
    return pool.request()
        .query('select * from hremployee')
}).then(result => {
    console.dir(result)
}).catch(err => {
  // ... error checks
});


 
  app.get('/', async (req, res) => {
    try {


        sql.connect(sqlConfig).then(pool => {
            // Query
            return pool.request()
                .input('input_parameter', sql.VarChar, req.query.input_parameter)
                .query('select companycode, employeecode, empstatus, empfirstnamee, empfirstnamea, empfathernamee, empfathernamea, maritalstatus, gender, religioncode, effectivedate from hremployee where companycode=@input_parameter')
        }).then(result => {
            res.json(result.recordset)
        }).catch(err => {
            res.json(err.message)
        });
    } catch (err) {
      res.status(500)
      res.send(err.message)
    }
  })

  app.use('/users', userRoutes);

  app.listen(8081,() => {
    console.log("Server started on port 8080");
})
