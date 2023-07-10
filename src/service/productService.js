import connection from "../connection.js";

class ProductService {
    constructor() {
        connection.connecting();
    }

    findAll(keyword) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`SELECT * FROM product WHERE id like '%${keyword}%' or name like '%${keyword}%'`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }

    save(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`INSERT INTO product VALUES (${product.id}, '${product.name}', ${product.price}, ${product.quantity});`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(`Add Success!`)
                    resolve(data)
                }
            })
        })
    }

    edit(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`UPDATE product SET name = '${product.name}', price = ${product.price}, quantity = ${product.quantity} WHERE id = ${product.id}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(`Edit Success!`)
                    resolve(products)
                }
            })
        })
    }

    delete(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`DELETE FROM product WHERE id = ${product}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products)
                }
            })
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`SELECT * FROM product WHERE id = ${id}`, (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(products[0])
                }
            })
        })
    }
}

export default new ProductService();
