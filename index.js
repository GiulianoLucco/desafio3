const express = require('express')
const fs = require("fs");
const app = express();

const PORT = 8080;

const server = app.listen(PORT,()=>{
    console.log("Servidor Iniciado");
})

const productos = [
    {
        title:'Taladro',
        price:150,
        thumnail:'https://firebasestorage.googleapis.com/v0/b/ferrimac-react.appspot.com/o/taladro1.webp?alt=media&token=4dd0feae-c65b-456b-92d5-92e361173aa9',
        id:1
    },
    {
        title:'Compresor',
        price:200,
        thumnail:'https://firebasestorage.googleapis.com/v0/b/ferrimac-react.appspot.com/o/compresor1.webp?alt=media&token=d1996503-db56-4e80-8f36-1092ec97bbb0',
        id:2
    },
      {
        title:'Hidrolavadora',
        price:300.45,
        thumnail:'https://firebasestorage.googleapis.com/v0/b/ferrimac-react.appspot.com/o/hidro1.webp?alt=media&token=6aa2891b-7f0e-4707-942b-61ce7b70278c',
        id:3
    }
      
]
class Contenedor{
    async save(producto){
        try{
            await fs.promises.writeFile('./productos.txt',JSON.stringify(producto,null,2),"utf-8" )
        }
        catch(e){
            console.log(e);            
        }
   }
    async getAll() {
        try{
            const contenido = await fs.promises.readFile('./productos.txt',"utf-8")
            console.log(contenido);
            return JSON.parse(contenido);
        }
        catch(error){}
    }
    async getById(id){
        const contenido = await this.getAll();
        const productoBuscado = contenido.filter(producto=>producto.id == id)
        console.log(productoBuscado);
        return productoBuscado;
        
        
    }
}
app.get("/productos",(req,res)=>{
    contenedor.getAll().then(productos=>{
        res.send(productos);
    })
    
})

app.get("/productoRandom", async (req, resp) => {
    let productoRandom = Math.floor(Math.random()*3)
      contenedor.getById(productoRandom).then(respuesta => resp.send(respuesta));
  });

const contenedor = new Contenedor();
contenedor.save(productos)



