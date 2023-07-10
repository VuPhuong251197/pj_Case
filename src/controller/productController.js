import fs from "fs";
import productService from "../service/productService.js";
import qs from "qs";
import url from "url";

class ProductController {

    showAll(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end',  () => {
            if (req.method === 'GET') {
                showList(req, res);
            } else {
                data = qs.parse(data);
                productService.save(data).then(() => {
                    res.writeHead(302, {
                        Location: '/products',
                    });
                    res.end();
                })
            }
        })
    }

    edit(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end',  () => {
            if (req.method === 'GET') {
                fs.readFile('view/product/edit.html', 'utf-8', (err, stringHTML) => {
                    let urlObject = url.parse(req.url, true)
                    productService.findById(urlObject.query.idEdit).then((product) => {
                        stringHTML = stringHTML.replace('{id}', product.id)
                        stringHTML = stringHTML.replace('{name}', product.name)
                        stringHTML = stringHTML.replace('{price}', product.price)
                        stringHTML = stringHTML.replace('{quantity}', product.quantity)
                        res.write(stringHTML);
                        res.end();
                    })
                })
            }
            else {
                data = qs.parse(data);
                productService.edit(data).then(() => {
                    res.writeHead(302, {
                        location :`/products`
                    })
                    showList(req, res);
                })
            }
        })
    }

    delete(req, res) {
        let urlObject = url.parse(req.url, true);
        let product = urlObject.query.id;
        productService.delete(product).then(() => {
            res.write(product);
            res.end()
        })
    }

    showFormAdd(req, res) {
        fs.readFile('view/product/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }


}

function showList(req, res) {
    fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        const urlObject = url.parse(req.url, true)
        const keyword = urlObject.query.keyword ?? '';
        productService.findAll(keyword).then((products)=> {
            for (const product of products) {
                str+=`<tr>
                        <td>${product.id} </td>
                        <td>${product.name} </td>
                        <td>${product.price} </td>
                        <td>${product.quantity} </td>
                        <td><button onclick="sendFetchDelete(${product.id})" style="text-decoration: none; color: black"> Delete Product </button></td>
                        <td><button><a href="/edit-product?idEdit=${product.id}" style="text-decoration: none; color: black" </a> Edit Product </button></td>
                      </tr>`
            }
            stringHTML = stringHTML.replace('{list}', str)
            stringHTML = stringHTML.replace('{keyword}', keyword)
            res.write(stringHTML);
            res.end();
        })
    })
}

export default new ProductController();
