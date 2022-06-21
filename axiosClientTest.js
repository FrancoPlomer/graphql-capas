import axios from "axios";

export class testAxios {
    async allProducts() {
        const response =  await axios.get('http://localhost:3001/api/products').then(response => {
                if(response.data)
                {
                    return {
                        message: 'todos los productos, prueba exito !',
                        data: response.data
                    }
                }
            }).catch(err => {
                return {
                    message: 'fallo prueba',
                    data: err
                }
            })
        return  response;
    }
    async productForId(id) {
        axios.get(`http://localhost:3001/api/products/${id}`)
            .then(response => {
                return {
                    message: 'Producto filtrado por id, prueba exito !',
                    data: response.data
                }
            }).catch(err => {
                return {
                    message: 'fallo prueba',
                    data: err
                }
            })
    }
    async newProduct(title, description, code, photoUrl, price, timestamp, stock) {
        axios.post('http://localhost:3001/api/products',
            title,
            description, 
            code, 
            photoUrl, 
            price, 
            timestamp, 
            stock
        )
            .then(response => {
                return {
                    message: 'Cargar producto, prueba exito!',
                    data: response.data
                }
            }).catch(err => {
                return {
                    message: 'fallo prueba',
                    data: err
                }
            })
    }
    async updateForId(id, body) {
        axios.put(`http://localhost:3001/api/products/${id}`, {
            id: body.id,
            title: body.title,
            description: body.description,
            code: body.code,
            photoUrl: body.photoUrl,
            price: body.price,
            timestamp: body.timestamp,
            stock: body.stoch
        })
            .then(response => {
                return {
                    message: 'Actualizar producto, prueba exito!',
                    data: response.data
                }
            }).catch(err => {
                return {
                    message: 'fallo prueba',
                    data: err
                }
            })
    }

    async deleteProductForId(id) {
        axios.delete(`http://localhost:3001/api/products/${id}`)
            .then(response => {
                return {
                    message: 'Producto eliminado por id, prueba exito !',
                    data: response.data
                }
            }).catch(err => {
                return {
                    message: 'fallo prueba',
                    data: err
                }
            })
    }

    async deleteAllProduct() {
        axios.delete('http://localhost:3001/api/products')
            .then(response => {
                return {
                    message: 'borrar todos los productos, prueba exito!',
                    data: response.data
                }
            }).catch(err => {
                return {
                    message: 'fallo prueba',
                    data: err
                }
            })
    }
}