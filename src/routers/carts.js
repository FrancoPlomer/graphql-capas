import { Router } from "express";
import cartApiFile from "../daos/carts/cartsDaoFile.js";
import cartApiMongo from "../daos/carts/cartsDaoMongo.js";
import cartApiFirebase from "../daos/carts/cartsDaoFirebase.js";
import twilio from "twilio";
import 'dotenv/config';
import users from "../models/users.js";
import { createTransport } from 'nodemailer';
import 'dotenv/config';
import logger from "../logger.js";


const selectDao = (db) => {
    switch (db) {
        case "mongo":
            return cartApiMongo;
        case "archivo":
            return cartApiFile;
        case "firebase":
            return cartApiFirebase;
        default:
            break;
    }
}



const carts = selectDao(process.env.DB) 
const cartsApiRouter = new Router();
const client = twilio(process.env.accountSid, process.env.authToken);
const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'theresa.kerluke28@ethereal.email',
        pass: 'ea1XrdztarUSbjp25h'
    }
});
const ADRESS_MAIL = 'info@ethereal.email'


let Admin = true;

cartsApiRouter.get('/', async (req, res) => {
    try {
        res.json(await carts.listAllCarts())
    } catch (error) {
        res.json({
            err: -1,
            message: error
        })
    }
})

cartsApiRouter.get('/:userName', async (req, res) => {
    try {
        res.json(await carts.listCart(req.params.userName))
    } catch (error) {
        res.json({
            err: -1,
            message: error
        })
    }
})

cartsApiRouter.get('/:id/products', async (req, res) => {
    try {
        res.json(await carts.listCartProducts(req.params.id))
    } catch (error) {
        res.json({
            err: -1,
            message: error
        })
    }
})

cartsApiRouter.post('/:userName', async (req, res) => {
    if(Admin){
        try {
            res.json(await carts.addCart(req.params.userName))
        } catch (error) {
            res.json({
                err: -1,
                message: error
            })
        }
    }
    else{
        res.json({
            err: -1,
            message: "ruta no autorizada"
        })
    }
})

cartsApiRouter.post('/:idCart/products/:idProduct', async (req, res) => {
    if(Admin){
        try {
            res.json(await carts.addProductsToCart(req.params.idCart, req.params.idProduct))
        } catch (error) {
            res.json({
                err: -1,
                message: error
            })
        }
    }
    else{
        res.json({
            err: -1,
            message: "ruta no autorizada"
        })
    }
})

cartsApiRouter.post('/:idCart/delete/:idProduct', async (req, res) => {
    if(Admin){
        try {
            res.json(await carts.deleteProductsToCart(req.params.idCart, req.params.idProduct))
        } catch (error) {
            res.json({
                err: -1,
                message: error
            })
        }
    }
    else{
        res.json({
            err: -1,
            message: "ruta no autorizada"
        })
    }
})

cartsApiRouter.put('/:id', async (req, res) => {
    if(Admin){
        try {
            res.json(await carts.update({ ...req.body, id: req.params.id }))
        } catch (error) {
            res.json({
                err: -1,
                message: error
            })
        }
    }
    else{
        res.json({
            err: -1,
            message: "ruta no autorizada"
        })
    }
})

cartsApiRouter.delete('/:id', async (req, res) => {
    if(Admin){
        try {
            res.json(await carts.deleteCart(req.params.id))
        } catch (error) {
            res.json({
                err: -1,
                message: error
            })
        }
    }
    else{
        res.json({
            err: -1,
            message: "ruta no autorizada"
        })
    }
})

cartsApiRouter.delete('/', async (req, res) => {
    if(Admin){
        try {
            res.json(await carts.deleteAllCarts())
        } catch (error) {
            res.json({
                err: -1,
                message: error
            })
        }
    }
    else{
        res.json({
            err: -1,
            message: "ruta no autorizada"
        })
    }
})

cartsApiRouter.post('/:userName/carts', async (req, res) => {
    if(Admin){
        try {
            const [Cart] = await carts.listCart(req.params.userName)
            const [user] = await users.find({user: Cart.userName})
            if(Cart.products.length > 0)
            {
                const mailOptions = {
                    from: `${user.mail}`,
                    to: ADRESS_MAIL,
                    subject: `<p>Nuevo pedido de: \n ${user.user} \n ${user.email} \n `,
                    html: `${JSON.stringify(Cart.products)}</p>`
                }
                await transporter.sendMail(mailOptions)

                await client.messages.create({
                    body: ` Nuevo pedido de: \n Cliente: ${user.user} \n Email: ${user.email} \n Productos: ${Cart.products.map(product => product.title)}`,
                    from: `whatsapp:${process.env.twilioNumberWhatsapp}`,
                    to: `whatsapp:${process.env.myNumberWhatsapp}`
                })

                await client.messages.create({
                    body: 'Su pedido fue recibido y se encuentra en proceso',
                    from: `${process.env.twilioNumber}`,
                    to: `${process.env.myNumber}`
                })
                await carts.clearProductsInCart(req.params.userName)
                res.json({confirm: "Compra confirmada"})
            }
            else{
                res.json({
                    err: "Su carrito esta vacio."
                })
            }
        } catch (error) {
            logger.error(error)
            res.json({
                err: -1,
                message: error
            })
        }
    }
    else{
        res.json({
            err: -1,
            message: "ruta no autorizada"
        })
    }
})



export default cartsApiRouter;