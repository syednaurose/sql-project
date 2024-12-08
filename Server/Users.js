import express from 'express';
import sql from 'mssql';
const router=new express.Router();

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
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
    , port: 1433
  }

router.get('/', async (req, res) => {
    try{
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
                .query('select * from users')
        }).then (result => {
            res.json(result)
        }).catch (error => {
            res.json(error)
        })

    } catch(err) {
        res.send(err.message)
    }
})

router.post('/', async (req, res) => {
    try{
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
                .input('param_userid', sql.VarChar, req.query.param_userid)
                .input('param_groupid', sql.VarChar, req.query.param_groupid)
                .input('param_usernamee', sql.VarChar, req.query.param_usernamee)
                .query('insert into users (userid, groupid, usernamee) values (@param_userid, @param_groupid, @param_usernamee)')
        }).then (result => {
            res.json(result)
        }).catch (error => {
            res.json(error)
        })

    } catch(err) {
        res.send(err.message)
    }
})

export default router