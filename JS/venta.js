

$.ajax({
    type: "GET",
    url: "https://localhost:44376/api/Venta/TraerTodasLasVentas",
    dataType: "json",

    success: function(data) {
        var contenedorventas=document.getElementById("contenedorProductos");
        contenedorventas.innerHTML=`
        <tr>
            <th>Id </th> 
            <th>Estado</th>
            <th>Fecha</th>
            <th></th>
        </tr>
        `;

        $.each(data, function(i, item) {
         contenedorventas.innerHTML+=`
         <tr>
         <td>${item.id}</td>
         `+ verificar(item.pagado,item.id) + `
         <td class="stock">${item.fecha}</td>
         <td><button class="btn btn-primary" data-toggle="modal" data-target="#VerDetalle"  onclick="verDetalle(${item.id});" >Ver detalles</button></td>
        </tr>
         
         `;


        });



    },
    error: function(error) {
        console.log(error.message);
        alert('error');
    }
 

});
function verificar(bool,ventaID){
    if(bool== true){
        
        return  ` <td class="stock"><select name="" id="selectBox" onchange="CambiarEstadoReserva(${ventaID})"><option>pago</option><option >Impago</option></select></td>`;
    }
    else{
        return  `<td class="stock"><select name="" id="selectBox" onchange="CambiarEstadoReserva(${ventaID})"><option>Impago</option><option >Pago</option></select></td> `;
    }
}   

function CambiarEstadoReserva(ventaID){
    
    $.ajax({
        type: "POST",
        url: "https://localhost:44376/api/Venta/CambiarEstadoReserva?ventaID="+ventaID,
        dataType: "JSON",
        contentType: "application/json",

        success: function(data) {
                alert("se ha cambiado correctamente");
                location.reload();

        },
        error: function(error) {
           
            alert('error');
        }


    });

}

function verDetalle(idventa){
    var  imgDetalle = document.getElementById("verDetallesFactura");
    $.ajax({
        type: "GET",
        url: "https://localhost:44376/api/Venta/MostrarDetalleVenta?ventaID="+idventa,
        dataType: "JSON",
        contentType: "application/json",

        success: function(data) {
               var bodymodal = document.getElementById("moda-body");
               bodymodal.innerHTML = ` 
               <div class="form-group ">
               <label>nombre:  </label>
               <label>${data.factura.nombre}</label>
            </div>
            <div class="form-group">
             <label>Apellido:  </label>
             <label>${data.factura.apellido}</label>
            </div>
            <div class="form-group">
             <label>Email:  </label>
             <label>${data.detalles.email}</label>
            </div>
            <div class="form-group">
             <label>Dirección:  </label>
             <label>${data.factura.direccion}</label>
            </div>
            <div class="form-group">
             <label>Referencias:  </label>
             <label>${data.factura.referencias}</label>
            </div>
            <div class="form-group"> 
             <label>Localidad:  </label>
             <label>${data.factura.localidad}</label>
            </div>
            <div class="form-group">
             <label>Codigo Postal:  </label>
             <label>${data.factura.codigopostal}</label>
            </div>
            <div class="form-group">
             <label>Valor de la venta:  </label>
             <label>$${data.detalles.valorcarrito}</label>
            </div>
            <div class="form-group">
             <label>Valor Envio:  </label>
             <label>$${data.detalles.valorenvio}</label>
            </div>
               ` 
                

        },
        error: function(error) {
           
            alert('error');
        }


    });

}

