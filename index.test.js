import { strict } from "assert";
import { expect } from "chai";
import { describe } from "mocha";
import supertest from "supertest";
import { testAxios } from "./axiosClientTest.js";

supertest('http://localhost:3001/api/products');
describe("test sobre el crud de productos", () => {
    const productToTest = {
        title: "coca cola",
        description: "gaseosa de cola",
        code: 1001,
        photoUrl: "https://http2.mlstatic.com/D_NQ_NP_961625-MLA46350451480_062021-O.webp",
        price: 200,
        timestamp: Date.now(),
        stock: 10
    }

    it('deberia traer todos los productos', () => {
        const test = new testAxios();
        strict.notStrictEqual(test.allProducts().data.length, 0)
        (test.allProducts().data.length).should.not.equal(0)
    })
    it('deberia traer un producto por su id', () => {
        const test = new testAxios();
        strict.notStrictEqual(test.productForId(1).data.length, 0)
        (test.productForId(1).data.length).should.not.equal(0)
    })
    it('deberia crear un nuevo producto', () => {
        const test = new testAxios();
        strict.strictEqual(typeof(test.newProduct( productToTest.title, productToTest.description, productToTest.code, productToTest.photoUrl, productToTest.price, productToTest.timestamp, productToTest.stock )), 'object')
        expect(typeof(test.newProduct( productToTest.title, productToTest.description, productToTest.code, productToTest.photoUrl, productToTest.price, productToTest.timestamp, productToTest.stock ))).to.be.a('object')
    })
    it('deberia actualizar un producto por su id', () => {
        const test = new testAxios();
        strict.strictEqual(test.updateForId( 1,productToTest ).acknowledged, true)
        expect(test.updateForId( 1,productToTest ).acknowledged).to.equal(true);
    })
    it('deberia eliminar un producto por su id', () => {
        const test = new testAxios();
        strict.strictEqual(test.deleteProductForId( 2 ).acknowledged, true)
        expect(test.deleteProductForId( 2 ).acknowledged).to.equal(true);
    })
    it('deberia eliminar todos los productos', () => {
        const test = new testAxios();
        strict.strictEqual(test.deleteAllProduct().acknowledged, true);
        expect(test.deleteAllProduct().acknowledged).to.equal(true);
    })
})