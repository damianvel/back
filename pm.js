import { readFileSync, writeFileSync } from 'fs'

//Se creará una instancia de la clase “ProductManager”

class ProductManager {


    constructor() {
        this.path = "./products.json"
        this.products = []
        writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))

    }

    getProducts = () => {
        const productsDb = JSON.parse(readFileSync(this.path))
        return productsDb
    }

    addProduct = (newProduct) => {

        const productAd = this.products.find(({ code }) => code === newProduct.code)

        if (productAd) {
            console.log('producto con este code ya existe')
            return productAd
        } else {

            if (newProduct["title" && "description" && "price" && "code" && "thumbnail" && "stock"]) {


                if (this.products.length === 0) {
                    newProduct.id = 1
                } else {
                    newProduct.id = this.products[this.products.length - 1].id + 1
                }

                this.products.push(newProduct)



                writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))

            }

            else {
                console.log(" faltan datos")
                return newProduct
            }
        }
    }

    getProductById = (idInput) => {

        const productsDb = JSON.parse(readFileSync(this.path))
        const productDb = productsDb.find(({ id }) => id === idInput)

        if (!productDb) {
            return "Not found"
        }
        return productDb
    }


}


const productManager = new ProductManager()

//Se llamará “getProducts” recién creada la instancia, 
//debe devolver un arreglo vacío []

console.log(productManager.getProducts())

//Se llamará al método “addProduct” con los campos:

productManager.addProduct(

    {
        title: "producto prueba",
        description: "este es un producto de prueba",
        price: 200,
        thumbnail: "sin imagen",
        code: "abc123",
        stock: 25,
    })


    //El objeto debe agregarse satisfactoriamente con un id
    //generado automáticamente SIN REPETIRSE

    console.log(productManager.getProducts()[0].id)


    //Se llamará el método “getProducts” nuevamente
    //esta vez debe aparecer el producto recién agregado

    console.log(productManager.getProducts())
 
    //Se llamará al método “addProduct” con los mismos campos de arriba
    //debe arrojar un error porque el código estará repetido.

    productManager.addProduct(

        {
            title: "producto prueba",
            description: "este es un producto de prueba",
            price: 200,
            thumbnail: "sin imagen",
            code: "abc123",
            stock: 25,
        })

   //Se evaluará que getProductById devuelva error si no encuentra el 
   //producto o el producto en caso de encontrarlo

   console.log(productManager.getProductById(1).title)
   console.log(productManager.getProductById(123))

