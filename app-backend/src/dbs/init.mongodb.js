'use-strict'

//design pattern : singleton
const { db: {host , name , username , password}} = require('../config/config.mongodb')
const mongoose = require('mongoose')
const connectString = `mongodb+srv://${username}:${password}@${host}/${name}`
const {countConnect} = require("../helpers/check.connect")

class Database{

    constructor(){
        this.connect()
    }

    connect(type = 'mongodb'){
        if(1 === 1 ){
            mongoose.set('debug', true);
            mongoose.set('debug', {color : true})
        }
        mongoose.connect(connectString)
            .then( _=> {
                countConnect()
                console.log('Connect mongodb success')
            })
            .catch( err => console.log('Error connect'))
    }


    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database()
        }

        return Database.instance;
    }

}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;