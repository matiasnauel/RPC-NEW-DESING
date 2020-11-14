
$.ajax({
    type: "GET",
    url: "https://localhost:44376/api/ComprobantePago/ComprobanteImagenVentaFecha",
    dataType: "json",

    success: function(data) {
        var contenedorventas=document.getElementById("contenedorProductos");
        contenedorventas.innerHTML=`
        <tr>
                         
                                 
        <th>Id Venta</th>
        <th>Fecha</th>

        <th>Comprobante</th>

        </tr>
        `;

        $.each(data, function(i, item) {
         contenedorventas.innerHTML+=`

         <tr>
                              
                                      
         <td class="stock">${item.venta}</td>
         <td class="stock">${item.fecha}</td>

         <td class="boton-centro" > <button  onclick="verImagen('${item.imagen}');" class="btn btn-primary"  data-toggle="modal" data-target="#MostrarComprobanteModal" >Ver imagen </button> </td>

         </tr>
         `;


        });



    },
    error: function(error) {
        console.log(error.message);
        alert('error');
    }
 

});

function verImagen(imagen){

    var imagenContenedor = document.getElementById("imagen-comprobante2");
    imagenContenedor.src =  "https://res.cloudinary.com/rpc-computacion/image/upload/v1605288168/hlssezifnqtzjjffjofp.jpg";
}

