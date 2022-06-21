import { ServerApiVersion } from 'mongodb';
import 'dotenv/config';

export default {
    PORT: process.env.PORT || 3001,
    mongoRemote: {
        client: { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 },
        cnxStr: `mongodb+srv://francoPlomer:${process.env.pass}@cluster0.fihir.mongodb.net/ecommerce?retryWrites=true&w=majority`
    },
    firebaseConfig: {
        type: "service_account",
        project_id: "ecommerce-921d8",
        private_key_id: "651d0bf32f877c89544cc9773fceedeab0b53e4a",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCdDMTjMHavnmyN\nLGX9Z0K3MR9Vx2IpEakyH0KetLw445YtGweRbFEnQRew+S04F5OfGTHYqYHaw1sc\ng/WCAhXFSu5J8S0iyrkj2sQgJuAtSNDlvN7zHGfcLtFD/dv5z8In6FMdAYS+R0y4\nwhlRsTXT2I41Nx4FT3ALt3LUDVDg8OJ2cCYWN1sN3hYiDqIg4jdC2z5rbUspJmtq\nxFZzHNIDiLTIKZ2oLzeG8AR4ZeXjQKnj1jphtuxOO3DUJ76QA6d/SBv5/EPYWhvp\nUpBR7emLZm9RD6GHUgcxJxfHtsBotraHVeaTKuKJCRXddvHcw2yUydUIAJmTA3ZH\nu30Zg3ZjAgMBAAECggEAFw+yc6gArZ4mU36jBVhd6BebAdYS2HQC89y6RCLHBtWI\njlwLOvP8YLbCu1aDqNpxb2ncM3QEoPKR1PidmvciakOsBQiYt6SsFhNAPHZo8c1g\n+3NGC83uhFsNmJ3U6PR0jrajSb2Y1/YRUooR/Lh4boC8tRzAWEhHbDkGcBP6feU2\ngGGUtan+t9mwSz4xLyYvb0N7QTCTgIikTKIaXe17KPgytjqBnLwgnXEVJwBkW9fy\nYLC27cKajiP9/9/g2LVaZ1f26lUCN9EmkeYpJXowhD7VsDPLLk3SCgkhc0S2I7t+\nXODwH/3oGNFQEMYeIGSEmPzcs2psyJO01jexr+3NUQKBgQDJ84l7OfGFW2J0DF3s\n+CKjed7Zmq8YwcvM9ZX1At5zpRMZXWNNMtGLp35unVPlWKi+XqG8MPJ2NFP3nZa2\nD7+WbklXU6vW+QX3vwmu5Xmw8MTpDlQgrR7TxAlzlpKs9YlEvYYhzGVQZIWABuY0\nz3uaJEe2g4l4gbB0QLcU/tkQMQKBgQDHFNyOcYdUtd0jJNqAKOlTgPpOGz6+Z529\nNxG0QvVii/cSbzKxd8e/wXH39cOIAOVMSwnOvZvEEFb09CwdRkhR5wV90K3cpLc1\nXJvSrsao0wsiZcD8gc2S5ywnJAkNHsfS9DFzDvDgNlN+KRQZffKT31ul+nrSTOl3\n9D++cxN+0wKBgG7Q/m3p+8gLv1iiuJ+iAY/m/gw2P0K8hRKw6FqL+nlG6dYPUsA3\n1Jhnjo8wMas2HVJpJyLXURTf3fuQM/Uvaxgm6IPM3AyYlVe/MpcQQNiBJewk+rD7\njmDxv6X3yAC0s2BPB11ghW+52S/JmWT9PXv10IwsXbEMqUEBifUxavbhAoGBAID4\nsd4SDGNDomx3HpqyZl4zi3T4T5CYnecL+ws16bSbCkhGA6hW+e/vSX8jFzZPpjzj\nzAnEaln9X+g3GzEn7AgrSzJz836isxH92fEGSyrp9iellf2/tcc6vi7pOHfoffnb\nOwHYJxKJ/1MXF69gGbvUkpIXkGQXcZTFhlpCQNoDAoGAYfwh4gF3yxFYoT80hK4N\nAgZe8dcplGI6ev1J6pCKRxmYWvdBj8p3LlCtB/qqaJECa7hdG5p14y4XkqMm9PSR\nkKwU4KXmwafTf3h7f3uugD+qg+OND/I1y8icAxA0bE0Cr7ZM77ekr5It8qFqn1lC\niBjW3hvh8DwFUTKMimrtf8U=\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-kmjxs@ecommerce-921d8.iam.gserviceaccount.com",
        client_id: "107206859028316765510",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kmjxs%40ecommerce-921d8.iam.gserviceaccount.com"
    },
    FileSystem: {
        path: './DB'
    }
}