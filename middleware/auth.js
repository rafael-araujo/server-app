const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');
const db = require('../db');
const date = require('../util/date');

module.exports = (req, res, next) => {
    expireTokens();

    if (req.method != 'OPTIONS'){

        const authHeader = req.headers.authorization;

        if (!authHeader)
            return res.status(401).send({error: 'Token not Found'});

        const authoParts = authHeader.split(' ');

        if (authoParts.length !== 2)
            return res.status(401).send({error: 'Invalid Token'});

        const [ scheme, token ] = authoParts;

        if (!/^Bearer$/i.test(scheme))
            return res.status(401).send({error: 'Token Malformated'});

        jwt.verify(token, authConfig.token, (err, decoded) => {
            if (err) return res.status(401).send({error: 'Invalid Token'});
        });

        /*if(!existToken(objToken))
            return res.status(401).send({error: 'Expired Token'});*/
    }
    next();
}

function expireTokens(){
    db('Authorization')
    .where('expirationDate', '<', date.dateNowFormated())
    .del()
    .then((data) => {
        return data;
    });
}

/*function existToken(objToken){
    db('Authorization')
    .where('token', objToken.token)
    .then((data) => {
        if (data.length !== 0){
            objToken.status = true;
        }
        else {
            objToken.status = false;
        }
    });
}*/