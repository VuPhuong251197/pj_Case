import fs from "fs";

class HomeController {
    showIndex(req, res) {
        fs.readFile('view/product/demo.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }
    showErr(req, res) {
        fs.readFile('view/err.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }
    showLogin(req,res) {
        fs.readFile('view/form/login.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }
}

export default new HomeController();