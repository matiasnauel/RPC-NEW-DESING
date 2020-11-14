

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
        </tr>
        `;

        $.each(data, function(i, item) {
         contenedorventas.innerHTML+=`
         <tr>
         <td>${item.id}</td>
         `+ verificar(item.pagado,item.id) + `
         <td class="stock">${item.fecha}</td>
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

