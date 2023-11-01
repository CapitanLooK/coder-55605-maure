import fs from 'fs'

export class ProductManager {

    constructor(path) {
        this.products = [];
        this.productId = 0;
        this.path = path
    }

    async addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        const findCode = this.products.some((p) => p.code === code);

        if (!title || !description || !price || !thumbnail || !code || !stock) return console.error('Todos los campos son obligatorios, vuelva a cargar el producto con todos los campos completos');

        if (findCode) return console.error(`El codigo de producto ${code} correspondiente al producto ${title} ya existe, vuelva a cargar el producto con otro codigo`);

        product.id = this.productId++;
        this.products.push(product);

        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));

    }

    async getProducts() {
        const jsonReaded = await fs.promises.readFile(this.path);
        const productsReaded = JSON.parse(jsonReaded);
        const productList = productsReaded.map(product => product);

        return productList


    }

    async getProductById(id) {
        const jsonReaded = await fs.promises.readFile(this.path);
        const productsReaded = JSON.parse(jsonReaded);

        const findedId = productsReaded.find((findId) => findId.id === id);

        if (!findedId) return console.error(`el id ${id} que busca no existe (Not Found)`);

        return findedId;
    };

    async updateProduct(id, updatedProduct) {
        const jsonReaded = await fs.promises.readFile(this.path);
        const productsReaded = JSON.parse(jsonReaded);
        const findedIndex = productsReaded.findIndex((findIndex) => findIndex.id === id);

        if (findedIndex !== -1) {
            productsReaded[findedIndex] = updatedProduct;
            await fs.promises.writeFile(this.path, JSON.stringify(productsReaded));
        } else {
            console.error(`el id ${id} que quiere actualizar no existe (Not Found)`);
        }

    }

    async deleteProduct(id) {
        const jsonReaded = await fs.promises.readFile(this.path);
        const productsReaded = JSON.parse(jsonReaded);
        const findedIndex = productsReaded.findIndex((findIndex) => findIndex.id === id);
        if (findedIndex !== -1) {
            productsReaded.splice(findedIndex, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(productsReaded));
        } else {
            console.error(`el id ${id} que quiere eliminar no existe (Not Found)`);
        }
    }
};

const productManager = new ProductManager('./data/products.json');


// productManager.addProduct({
//     title: "microfono",
//     description: "microfono condenser",
//     price: 1000,
//     thumbnail: "url foto mic",
//     code: 3,
//     stock: 1
// })

// productManager.addProduct({
//     title: "parlante",
//     description: "parlante de estudio",
//     price: 5000,
//     thumbnail: "url foto parlante",
//     code: 5,
//     stock: 1
// })

// productManager.addProduct({
//     title: "gabinete",
//     description: "gabinete con vidrio templado",
//     price: 2500,
//     thumbnail: "url foto gabinete",
//     code: 8,
//     stock: 3
// })

// productManager.updateProduct(2,   {
//     title: 'parlante',
//     description: 'parlante de estudio modificado',
//     price: 5000,
//     thumbnail: 'url foto parlante',
//     code: 5,
//     stock: 1,
//     id: 2
//   })

