import { promises as fs } from 'fs'

class ContenedorArchivo {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async listar(id) {
        const elementos = await this.listarAll()
        const buscado = elementos.find(e => e.id == id)
        return buscado;
    }

    async listarAll() {
        try {
            const elementos = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(elementos)
        } catch (error) {
            return []
        }
    }

    async guardar(elemento) {
        const elementos =  await this.listarAll()

        let newId;
        const timestamp = Date.now();
        if(elementos.length == 0) {
            newId = 1;
        } else {
            newId = elementos[elementos.length - 1].id + 1
        }

        const nuevoElemento = { ...elemento, id: newId, timestamp: timestamp }
        elementos.push(nuevoElemento)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(elementos, null, 2))
            return newId;
        } catch (error) {
            throw new Error(`error al guardar: ${error}`)
        }
    }

    async actualizar(elemento) {
        const elementos = await this.listarAll();
        const index = elementos.findIndex(e => e.id == elemento.id)
        if (index == -1){
            throw new Error(`Error al actualizar: no se encontro el id ${elemento.id}`)
        }
        else {
            elementos[index] = elemento
            try {
                await fs.writeFile(this.ruta, JSON.stringify(elementos, null, 2))
            } catch (error) {
                throw new Error(`Error al borrar: no se encontro el id ${id}`)
            }
        }
    }

    async borrar(id) {
        const elementos = await this.listarAll()
        const index = elementos.findIndex(e => e.id == id)
        if (index == -1){
            throw new Error(`Error al borrar: no se encontro el id ${elemento.id}`)
        }
        elementos.splice(index, 1)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(elementos, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async borrarAll() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
    }
}

export default ContenedorArchivo;