var Producto = require('../models/producto');
var slugify = require('slugify');
var fs = require('fs');
var path = require('path');

const registro_producto_admin = async function(req,res){
    if(req.user){
        let data = req.body;
        let productos = await Producto.find({titulo:data.titulo});
        console.log(productos.length);

        if(productos.length>= 1){
            res.status(200).send({data:undefined,message: 'El titulo del producto ya existe.'});   
        }else{
            //REGISTRO PRODUCTO
            var img_path = req.files.portada.path;
            var str_img = img_path.split('\\');
            var str_portada = str_img[2];

            ///

            data.portada = str_portada;
            data.slug = slugify(data.titulo);
            
            try {
                let producto = await Producto.create(data);
                res.status(200).send({data:producto});
            } catch (error) {
                res.status(200).send({data:undefined,message: 'No se pudo crear el producto.'});   
            }
        }
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const listar_productos_admin = async function(req,res){
    if(req.user){

        let filtro = req.params['filtro'];

        let productos = await Producto.find({
            $or: [
                {titulo: new RegExp(filtro,'i')},
                {categoria: new RegExp(filtro,'i')}
            ]
        });
        res.status(200).send(productos);

    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const obtener_portada_producto = async function(req,res){
    let img = req.params['img'];

    fs.stat('./uploads/productos/'+img,function(err){
        if(err){
            let path_img = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/productos/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
}


const obtener_producto_admin = async function(req,res){
    if(req.user){

        let id = req.params['id'];

        try {
            let producto = await Producto.findById({_id: id});
       
            res.status(200).send(producto);
        } catch (error) {
            res.status(200).send(undefined);
        }

    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const actualizar_producto_admin = async function(req,res){
    if(req.user){
        let data = req.body;
        let id = req.params['id'];


        let productos = await Producto.find({titulo:data.titulo});
        console.log(productos.length);

        if(productos.length>= 1){
            if(productos[0]._id == id){
                if(req.files){
                    //REGISTRO PRODUCTO
                    var img_path = req.files.portada.path;
                    var str_img = img_path.split('\\');
                    var str_portada = str_img[2];
    
                    ///
    
                    data.portada = str_portada;
                    data.slug = slugify(data.titulo);
                    
                    try {
                        let producto = await Producto.findByIdAndUpdate({_id:id},{
                            titulo: data.titulo,
                            categoria:data.categoria,
                            extracto: data.extracto,
                            estado: data.estado,
                            descuento: data.descuento,
                            portada: data.portada,
                        });
                        res.status(200).send({data:producto});
                    } catch (error) {
                        res.status(200).send({data:undefined,message: 'No se pudo crear el producto.'});   
                    }
                }else{
    
                     data.slug = slugify(data.titulo);
                     
                     try {
                         let producto = await Producto.findByIdAndUpdate({_id:id},{
                             titulo: data.titulo,
                             categoria:data.categoria,
                             extracto: data.extracto,
                             estado: data.estado,
                             descuento: data.descuento
                         });
                         res.status(200).send({data:producto});
                     } catch (error) {
                         res.status(200).send({data:undefined,message: 'No se pudo crear el producto.'});   
                     }
                }
            }else{
                res.status(200).send({data:undefined,message: 'El titulo de producto ya existe.'});   
            }
        }else{
            if(req.files){
                //REGISTRO PRODUCTO
                var img_path = req.files.portada.path;
                var str_img = img_path.split('\\');
                var str_portada = str_img[2];

                ///

                data.portada = str_portada;
                data.slug = slugify(data.titulo);
                
                try {
                    let producto = await Producto.findByIdAndUpdate({_id:id},{
                        titulo: data.titulo,
                        categoria:data.categoria,
                        extracto: data.extracto,
                        estado: data.estado,
                        descuento: data.descuento,
                        portada: data.portada,
                    });
                    res.status(200).send({data:producto});
                } catch (error) {
                    res.status(200).send({data:undefined,message: 'No se pudo crear el producto.'});   
                }
            }else{

                 data.slug = slugify(data.titulo);
                 
                 try {
                     let producto = await Producto.findByIdAndUpdate({_id:id},{
                         titulo: data.titulo,
                         categoria:data.categoria,
                         extracto: data.extracto,
                         estado: data.estado,
                         descuento: data.descuento
                     });
                     res.status(200).send({data:producto});
                 } catch (error) {
                     res.status(200).send({data:undefined,message: 'No se pudo crear el producto.'});   
                 }
            }
        }
    }else{
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

module.exports = {
    registro_producto_admin,
    listar_productos_admin,
    obtener_portada_producto,
    obtener_producto_admin,
    actualizar_producto_admin
}