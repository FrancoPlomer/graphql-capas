import * as productsModel from "../models/products.js";
import * as cartsModel from "../models/carts.js";
import { createTransport } from 'nodemailer';


const ADRESS_MAIL = 'info@ethereal.email'

export class ContainerProductsMongo {
    constructor () {
    }

    async list(id) {
        const productFilter = await productsModel.products.find({id})
        return productFilter;
    }

    async listAll() {
        try {
            const allProducts = await productsModel.products.find()
            return allProducts
        } catch (error) {
            throw new Error(`Error al mostrar todos los productos: ${error}`)
        }
    }

    async save(product) {
        if(product) {
            const products =  await this.listAll()
    
            let newId;
            const timestamp = Date.now()

            if(products.length == 0) {
                newId = 1;
            } else {
                newId = products[products.length - 1].id + 1
            }
    
            const newProduct = { ...product, id: newId, timestamp }
            const newProductSaveModel = new productsModel.products(newProduct);
            const newProductSave = await newProductSaveModel.save()
            return newProductSave;
        }
        else{
            return{
                err: -1,
                message: "no envio ningun producto"
            }
        }
    }

    async update(product) {
        const productUpdate = await productsModel.products.updateOne({id: product.id}, {
            $set: product
        })
        return productUpdate;
    }

    async delete(id) {
        const productDelete = await productsModel.products.deleteOne({id: id})
        return productDelete
    }

    async deleteAll() {
        const productoDeleteAll = await productsModel.products.deleteMany({})
        return productoDeleteAll;
    }

}


export class ContainerCartsMongo extends ContainerProductsMongo {
    constructor () {
        super()
    }

    async listCart(userName) {
        try {
            const cart = await cartsModel.carts.find({userName})
            return cart
        } catch (error) {
            throw new Error(`Error al mostrar todos los productos: ${error}`)
        }
    }

    async listAllCarts() {
        try {
            const allCarts = await cartsModel.carts.find()
            return allCarts
        } catch (error) {
            throw new Error(`Error al mostrar todos los productos: ${error}`)
        }
    }

    async addCart(userName) {
        try {

            const cart = await cartsModel.carts.find({userName})
            if (cart.length !== 0){
                return cart;
            }
            else{
                const carts =  await this.listAllCarts()
            
                let newId;
                const timestamp = Date.now()
        
                if(carts.length == 0) {
                    newId = 1;
                } else {
                    newId = parseInt(carts[carts.length - 1].id) + 1
                }
        
                const newCart = { id: newId, userName: userName, timestamp, products: [] }
                const newCartSaveModel = new cartsModel.carts(newCart);
                const newCartSave = await newCartSaveModel.save()
                return newCartSave;
            }
        } catch (error) {
            return {
                err: -1,
                message: "no envio ningun producto"
            }
        }
    }

    async listCartProducts(id) {
        try {
            const [ cart ] = await cartsModel.carts.find({id})
            return cart.products
        } catch (error) {
            throw new Error(`Error al mostrar todos los productos: ${error}`)
        }
    }

    async addProductsToCart(idCart, idProduct) {
        const [ cart ] = await cartsModel.carts.find({id: idCart})
        const [ product ] = await this.list(idProduct)

        if(!cart.isConfirm)
        {
            const cartNewProduct = await cartsModel.carts.updateOne({id: idCart}, {
                $set: { products: [...cart.products, product] }
            })
            return cartNewProduct
        }
        else{
            return {
                err: "La compra ya fue confirmada !"
            }
        }
    }

    async deleteProductsToCart(idCart, idProduct) {
        const [ cart ] = await cartsModel.carts.find({id: idCart})
        const indexProduct = cart.products.findIndex((product) => product.id == idProduct)
        cart.products.splice(indexProduct, 1)
        const cartNewProduct = await cartsModel.carts.updateOne({id: idCart}, {
            $set: { products: [...cart.products ] }
        })
        return cartNewProduct
    }

    async deleteCart(id) {
        const cartDelete = await cartsModel.carts.deleteOne({id: id})
        return cartDelete
    }

    async deleteAllCarts() {
        const cartDeleteAll = await cartsModel.carts.deleteMany({})
        return cartDeleteAll;
    }

    async clearProductsInCart(userName) {
        const [ cart ] = await cartsModel.carts.find({userName: userName})
        if (cart)
        {
            await cartsModel.carts.updateOne({userName: userName}, {
                $set: { products: [] }
            })
        }
        else{
            return {
                err: -1,
                message: "No se encontro el carrito."
            }
        }
    }
}
