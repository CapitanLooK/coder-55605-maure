class ProductManager {

    constructor() {
        this.products = [];
        this.productId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const findCode = this.products.some((p) => p.code === code);

        if (!title || !description || !price || !thumbnail || !code || !stock) return console.error('Todos los campos son obligatorios, vuelva a cargar el producto con todos los campos completos');

        if (findCode) return console.error(`El codigo de producto ${code} correspondiente al producto ${title} ya existe, vuelva a cargar el producto con otro codigo`);

        const newProduct = {
            id: this.productId++,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };

        this.products.push(newProduct);

    }

    getProducts() {
        const productList = this.products.map(product => product);

        console.log('la lista de productos es', productList);
    }

    getProductById(id) {
        const findedId = this.products.find((findId) => findId.id === id);

        if (!findedId) return console.error(`el id ${id} que busca no existe (Not Found)`);

        return console.log(`el producto con id ${id} es:`, findedId);
    };
};

const productManager = new ProductManager();

productManager.addProduct("parlante", "parlante para bajos", 100, "url foto parlante", 5, 2);
productManager.addProduct("microfono", "microfono condenser", 1000, "url foto mic", 3, 1);
productManager.addProduct('monitor', 'monitor 24 pulgadas', 5000, 'url foto monitor', 3, 4)
productManager.getProducts();
productManager.getProductById(1);
productManager.getProductById(5)