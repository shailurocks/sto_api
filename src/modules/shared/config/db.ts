import { Dialect } from 'sequelize/types';

export const DbConfig = {
    default:{
        dialect: 'mysql' as Dialect,
        replication: {
            read: [
                {
                    host: process.env.SLAVE_DB_HOST,
                    port: parseInt(process.env.SLAVE_DB_PORT) || 3306,
                    username: process.env.SLAVE_DB_USERNAME,
                    password: process.env.SLAVE_DB_PASSWORD,
                },
            ],
            write: {
                host: process.env.MASTER_DB_HOST,
                port: parseInt(process.env.MASTER_DB_PORT) || 3306,
                username: process.env.MASTER_DB_USERNAME,
                password: process.env.MASTER_DB_PASSWORD,
            },
        },
        pool: {
            max: 10,
            min: 2,
            idle: 30000,
            evict:30000
        },
        logging: false,
    },
    masterdb: {
        dialect: 'mysql' as Dialect,
        host: process.env.MASTER_DB_HOST,
        port: parseInt(process.env.MASTER_DB_PORT) || 3306,
        username: process.env.MASTER_DB_USERNAME,
        password: process.env.MASTER_DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: false,
        pool: {
            max: 1,
            min: 1,
            idle: 30000,
            evict: 30000
        },
    },
    slavedb: {
        dialect: 'mysql' as Dialect,
        host: process.env.SLAVE_DB_HOST,
        port: parseInt(process.env.SLAVE_DB_PORT) || 3306,
        username: process.env.SLAVE_DB_USERNAME,
        password: process.env.SLAVE_DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: false,
        pool: {
            max: 10,
            min: 1,
            idle: 30000,
            evict: 30000
        },
    },
};
