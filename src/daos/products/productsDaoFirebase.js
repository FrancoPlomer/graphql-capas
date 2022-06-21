import { ContainerProductsFirebase } from "../../containers/ContainerFirebase.js";
import config from "../../config.js";
import admin from "firebase-admin"

admin.initializeApp({
    credential: admin.credential.cert(config.firebaseConfig),
})

const productosApiFirebase = new ContainerProductsFirebase();

export default productosApiFirebase;