//let ruta = "http://150.136.171.92:8080"
let ruta ="http://localhost:8080"

function traerMensajes(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoMensajes").empty();
            pintarMensaje(respuesta)
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}
function queryByIdMessage(){
    let id = $("#getOneMessage").val();
    if(id == ""){
        alert("Debe digitar el ID")
    }else{
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Message" + "/" + id,
            type:"GET",
            datatype:"JSON",
            success: function(respuesta){
                console.log(respuesta);
                $("#resultadoMensajes").empty();
                if(respuesta != null){
                    $("#idMensaje").val(respuesta.idMessage);
                    $("#messagetext").val(respuesta.messageText);
                    alert("Producto encontrado satisfactoriamente")
                }else{
                    alert("el ID no se encuentra resgistrado")
                }
            },
            error: function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }
}
function pintarMensaje(respuesta){
    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr>";
    myTable += "<td>"+"ID"+"</td>";
    myTable += "<td>"+"MESSAGETEXT"+"</td>";
    myTable += "<td>"+"BOAT"+"</td>";
    myTable += "<td>"+"CLIENT"+"</td>";
    myTable += "<td>"+"BUTTON"+"</td>";
    myTable += "</tr>";
    myTable += "</thead>";
    myTable += "<tr>";
    for(i = 0; i < respuesta.length; i++){
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].idMessage + "</td>";
        myTable += "<td>" + respuesta[i].messageText + "</td>";
        if(respuesta[i].boat.category == null){
            myTable += "<td>" + respuesta[i].boat.name + "("+ "sin categoria asignada" + ")" + "</td>";
        }else{
            myTable += "<td>" + respuesta[i].boat.name + "(" + respuesta[i].boat.category.name + ")" + "</td>";
        }
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        myTable += "<td> <button onclick='borrarMensaje("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoMensajes").append(myTable);
}
function guardarMensaje(){
    if((listBoats.value == "") || (listClients.value == "")){
        alert("Debe asignar el mensaje a un cliente y un barco")
    }else{
        let idCliente= {
            idClient:listClients.value
        }
        let idBoat = {
            id:listBoats.value
        }
        console.log(idBoat, idCliente);
        let myData = {
            idMessage:$("#idMensaje").val(),
            messageText:$("#messagetext").val(),
            boat:idBoat,
            client:idCliente
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Message/save",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            success:function(mensajes){
                console.log(mensajes)
                $("#resultadoMensajes").empty();
                $("#idMensaje").val("");
                $("#messagetext").val("");
                traerMensajes();
                alert("Mensaje creado exitosamente");
            },
            error : function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }//close if/else
}//close function
function editarMensaje(){
    if($("#idGetBoatMessage").val() != "" && $("#idGetClientMessage").val() != ""){
        let dataBarco = {
            id:$("#idGetBoatMessage").val()
        }
        let dataCliente = {
            idClient: $("#idGetClientMessage").val()
        }
        let myData = {
            idMessage:$("#idMensaje").val(),
            messageText:$("#messagetext").val(),
            boat:dataBarco,
            client:dataCliente
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Message/update",
            type:"PUT",
            data:dataToSend,
            datatype:"JSON",
            success:function(respuesta){
                $("#resultadoMensajes").empty();
                $("#idMensaje").val(respuesta.idMessage);
                $("#messagetext").val(respuesta.messageText);
                if(respuesta.boat.category != null){
                    $("#dataBoatMessage").val(respuesta.boat.name + "(" + "cat: " + respuesta.boat.category.name + ")");
                }else{
                    $("#dataBoatMessage").val("Sin categoria asignada");
                }
                $("#idGetBoatMessage").val(respuesta.boat.id);
                $("#dataClientMessage").val(respuesta.client.name);
                $("#idGetClientMessage").val(respuesta.client.idClient);
                traerMensajes();
                alert("Mensaje actualizado exitosamente");
            },
            error : function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    } else if($("#idGetBoatMessage").val() != "" && $("#idGetClientMessage").val() == ""){
        let dataBarco = {
            id:$("#idGetBoatMessage").val()
        }
        let myData = {
            idMessage:$("#idMensaje").val(),
            messageText:$("#messagetext").val(),
            boat:dataBarco,
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Message/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultadoMensajes").empty();
                $("#idMensaje").val("");
                $("#messagetext").val("");
                traerMensajes();
                alert("Mensaje actualizado exitosamente");
            },
            error : function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }else if($("#idGetBoatMessage").val() == "" && $("#idGetClientMessage").val() != ""){
        let dataCliente = {
            idClient: $("#idGetClientMessage").val()
        }
        let myData = {
            idMessage:$("#idMensaje").val(),
            messageText:$("#messagetext").val(),
            client:dataCliente
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Message/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultadoMensajes").empty();
                $("#idMensaje").val("");
                $("#messagetext").val("");
                traerMensajes();
                alert("Mensaje actualizado exitosamente");
            },
            error : function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }else{
        let myData = {
            idMessage:$("#idMensaje").val(),
            messageText:$("#messagetext").val(),
        };
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Message/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultadoMensajes").empty();
                $("#idMensaje").val("");
                $("#messagetext").val("");
                traerMensajes();
                alert("Mensaje actualizado exitosamente");
            },
            error : function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }

}
function borrarMensaje(idElemento){
    let id = parseInt(idElemento);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Message" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoMensajes").empty();
            traerMensajes();
            alert("Mensaje borrado exitosamente");
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}
function llenarBarcos(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Boat/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            let listabarcos = document.getElementById("listBoats");
            for(i=0; i<respuesta.length; i++){
                let list = document.createElement('option');
                if(respuesta[i].category != null){
                    list.innerHTML = respuesta[i].name + "(" + respuesta[i].category.name + "-" + respuesta[i].category.description + ")";
                    list.value = respuesta[i].id;
                    listabarcos.appendChild(list);
                }else{
                    list.innerHTML = respuesta[i].name + "(" + "sin categoria asignada" + ")";
                    list.value = respuesta[i].id;
                    listabarcos.appendChild(list);
                }

            }
        }
    })

}
function llenarClientes(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            let listaClientes = document.getElementById("listClients");
            for(i=0; i<respuesta.length; i++){
                let list = document.createElement('option');
                list.innerHTML = respuesta[i].name;
                list.value = respuesta[i].idClient;
                listaClientes.appendChild(list);
            }
        }
    })

}
function ejecutarBasicos(){
    llenarBarcos();
    llenarClientes();
}