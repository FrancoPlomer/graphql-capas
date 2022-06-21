import admin from "firebase-admin"


export class ContainerProductsFirebase {
    constructor () {
        this.db = admin.firestore()
        this.queryProducts = this.db.collection("products")
    }

    async list(id) {
        const product = await this.queryProducts.doc(id).get()
        if(product.exists) {
            return {id: product.id, ...product.data()}
        } else {
            throw new Error("No se encontre el producto deseado")
        }
    }

    async listAll() {
        try {
            const querySnapshot = await this.queryProducts.get()
            const docs = querySnapshot.docs;

            const reponse = docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                description: doc.data().description,
                code: doc.data().code,
                photoUrl: doc.data().photoUrl,
                price: doc.data().price,
                timestamp: doc.data().timestamp,
                stock: doc.data().stock,
            }))

            return reponse
        } catch (error) {
            throw new Error(`Error al mostrar todos los productos: ${error}`)
        }
    }

    async save(product) {
        if(product){
            const products =  await this.listAll()
    
            let newId;
            const timestamp = Date.now()

            if(products.length == 0) {
                newId = 1;
            } else {
                newId = parseInt(products[products.length - 1].id) + 1
            }
    
            const newProduct = { ...product, timestamp }
            await this.queryProducts.doc(`${newId}`).set(newProduct);
            return newProduct;
        }
        else{
            throw new Error(`no envio ningun producto`)
        }
    }

    async update(product) {
        try {
            await this.queryProducts.doc(product.id).update(product)
            return product
        } catch (error) {
            throw new Error("no se encontro el producto a actualizar")
        }
    }

    async delete(id) {
        try {
            await this.queryProducts.doc(id).delete()
            return {
                mesagge: "se borro el producto de forma exitosa!"
            }
        } catch (error) {
            throw new Error("no se encontro el producto a borrar")
        }
    }

    async deleteAll() {
        const productos =  await this.listAll()
        if(productos.length != 0) {
            productos.map(async(product) => {
                await this.queryProducts.doc(product.id).delete() 
            }) 
            return {
                mesagge: "se borraron todos los productos de forma exitosa!"
            }
        } else {
            throw new Error("no hay productos para borrar")
        }
    }
}

export class ContainerCartsFirebase extends ContainerProductsFirebase{
    constructor () {
        super()
        this.db = admin.firestore()
        this.queryCarts = this.db.collection("carts")
    }

    async listCart(id) {
        const doc = await this.queryCarts.doc(`${id}`).get()
        if(doc.exists){
            return { id: doc.id, ...doc.data() };
        } else {
            throw new Error("No se encontre el producto deseado")
        }
    }

    async listAllCarts() {
        try {
            const querySnapshot = await this.queryCarts.get()
            const docs = querySnapshot.docs;

            const reponse = docs.map((doc) => ({
                id: doc.id,
                timestamp: doc.data().timestamp,
                products: doc.data().products,
            }))

            return reponse
        } catch (error) {
            throw new Error(`Error al mostrar todos los carritos: ${error}`)
        }
    }

    async addCart() {
        try {
            const carts =  await this.listAllCarts()
            let newId;
            const timestamp = Date.now()

            if(carts.length == 0) {
                newId = 1;
            } else {
                newId = parseInt(carts[carts.length - 1].id) + 1
            }
    
            const newCart = { timestamp, products: [] }
            await this.queryCarts.doc(`${newId}`).set(newCart);

            return {id: newId, ...newCart };

        } catch (error) {
            throw new Error(`no envio ningun producto`)
        }
    }

    async listCartProducts(idCart) {
        try {
            const cart = await this.listCart(idCart)
            return cart.products
        } catch (error) {
            throw new Error("Error al mostrar todos los productos")
        }
    }

    async addProductsToCart(idCart, idProduct) {
        try {
            const cart = await this.listCart(idCart)
            const product = await this.list(idProduct)
            await this.queryCarts.doc(idCart).update({
                ...cart,
                products: [...cart.products, product]
            })

            return product
        } catch (error) {
            throw new Error("Error al mostrar todos los productos")
        }
    }

    async deleteProductsToCart(idCart, idProduct) {
        try {
            const cart = await this.listCart(idCart)
            const indexProduct = cart.products.findIndex((product) => product.id == idProduct)
            cart.products.splice(indexProduct, 1)
            await this.queryCarts.doc(idCart).update({...cart})
            return cart
        } catch (error) {
            throw new Error("Error al mostrar todos los productos")
        }
    }

    async deleteCart(id) {
        try {
            await this.queryCarts.doc(id).delete()
            return {
                mesagge: "se borro el carrito"
            }
        } catch (error) {
            throw new Error("no hay carritos para borrar")
        }
    }

    async deleteAllCarts() {
        const carts =  await this.listAllCarts()
        if(carts.length != 0) {
            carts.map(async(cart) => {
                await this.queryCarts.doc(cart.id).delete() 
            }) 
            return {
                mesagge: "se borraron todos los carritos de forma exitosa!"
            }
        } else {
            throw new Error("no hay carritos para borrar")
        }
    }
}