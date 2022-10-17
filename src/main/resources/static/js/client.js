//let ruta = "http://150.136.171.92:8080"
let ruta ="http://localhost:8080"

function traerInfCliente(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoCliente").empty();
            pintarRespuestaCliente(respuesta);
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
function queryByIdClient(){
    let idClient = $("#SetIdClient").val();
    if(idClient === ""){
        alert("Debe digitar el ID")
    }else{
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Client" + "/" + idClient,
            type:"GET",
            datatype:"JSON",
            success: function(respuesta){
                console.log(respuesta);
                $("#resultadoCliente").empty();
                if(respuesta != null){
                    $("#idCliente").val(respuesta.idClient);
                    $("#nameCliente").val(respuesta.name);
                    $("#email").val(respuesta.email);
                    $("#password").val(respuesta.password);
                    $("#age").val(respuesta.age);
                    $("#messagesClient").empty();
                    $("#reservationsClient").empty();
                    let myTableReservations = "<table>";
                    myTableReservations += "<span>" + "RESERVATIONS" + "</span>";
                    myTableReservations += "<thead>";
                    myTableReservations += "<tr>";
                    myTableReservations += "<td>"+"ID"+"</td>";
                    myTableReservations += "<td>"+"STARTDATE"+"</td>";
                    myTableReservations += "<td>"+"DEVOLUTIONDATE"+"</td>";
                    myTableReservations += "<td>"+"STATUS"+"</td>";
                    myTableReservations += "<td>"+"BOAT"+"</td>";
                    myTableReservations += "<td>"+"CATEGORY"+"</td>";
                    myTableReservations += "</tr>";
                    myTableReservations += "</thead>";
                    if(respuesta.reservations.length != 0){
                        for(i=0; i<respuesta.reservations.length; i++){
                            myTableReservations += "<tr>"
                            myTableReservations += "<td>" + respuesta.reservations[i].idReservation + "</td>";
                            myTableReservations += "<td>" + respuesta.reservations[i].startDate + "</td>";
                            myTableReservations += "<td>" + respuesta.reservations[i].devolutionDate + "</td>";
                            myTableReservations += "<td>" + respuesta.reservations[i].status + "</td>";
                            myTableReservations += "<td>" + respuesta.reservations[i].boat.name + "</td>"
                            myTableReservations += "<td>" + respuesta.reservations[i].boat.category.name + " " + "(" + respuesta.reservations[i].boat.category.description + ")" + "</td>";
                        }
                        $("#reservationsClient").append(myTableReservations);
                    }else{
                        alert("Aun no tiene reservas registradas")
                    }
                    if(respuesta.messages.length != 0){
                        let myTableMessage = "<table>";
                        myTableMessage += "<span>" + "MESSAGES" + "</span>";
                        myTableMessage += "<thead>";
                        myTableMessage += "<tr>";
                        myTableMessage += "<td>"+"ID"+"</td>";
                        myTableMessage += "<td>"+"MESSAGETEXT"+"</td>";
                        myTableMessage += "<td>"+"BOAT"+"</td>";
                        myTableMessage += "<td>"+"CATEGORY"+"</td>";
                        myTableMessage += "</tr>";
                        myTableMessage += "</thead>";
                        for(i=0; i<respuesta.messages.length; i++){
                            myTableMessage += "<tr>"
                            myTableMessage += "<td>" + respuesta.messages[i].idMessage + "</td>";
                            myTableMessage += "<td>" + respuesta.messages[i].messageText + "</td>";
                            myTableMessage += "<td>" + respuesta.messages[i].boat.name + "(" + "id:"+ respuesta.messages[i].boat.id + ")" + "</td>";
                            myTableMessage += "<td>" + respuesta.messages[i].boat.category.name + "(" + "id:"+ respuesta.messages[i].boat.category.id + ")" + "</td>";
                        }
                        $("#messagesClient").append(myTableMessage);
                    }else{
                        alert("Aun no tiene mensajes registrados")
                    }
                    alert("Petición realizada exitosamente")
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
function pintarRespuestaCliente(respuesta){
    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr>";
    myTable += "<td>"+"ID"+"</td>";
    myTable += "<td>"+"NAME"+"</td>";
    myTable += "<td>"+"EMAIL"+"</td>";
    myTable += "<td>"+"PASSWORD"+"</td>"
    myTable += "<td>"+"AGE"+"</td>";
    myTable += "<td>"+"BUTTON"+"</td>";
    myTable += "</tr>";
    myTable += "</thead>";
    myTable += "<tr>";
    for(i = 0; i < respuesta.length; i++){
        myTable += "<td>" + respuesta[i].idClient + "</td>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].email + "</td>";
        myTable += "<td>" + respuesta[i].password + "</td>";
        myTable += "<td>" + respuesta[i].age + "</td>";
        myTable += "<td> <button onclick='borrarCliente("+respuesta[i].idClient+")'>Borrar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoCliente").append(myTable);
}
function guardarInfCliente(){
    let myData = {
        id:$("#idCliente").val(),
        name:$("#nameCliente").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        age:$("#age").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Client/save",
        type:"POST",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCliente").empty();
            $("#idCliente").val("");
            $("#nameCliente").val("");
            $("#email").val("");
            $("#password").val("");
            $("#age").val("");
            traerInfCliente();
            alert("Se ha creado cliente exitosamente")
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
function editarInfCliente(){
    let myData = {
        idClient:$("#idCliente").val(),
        name:$("#nameCliente").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        age:$("#age").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCliente").empty();
            $("#idCliente").val("");
            $("#nameCliente").val("");
            $("#email").val("");
            $("#age").val("");
            traerInfCliente();
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            alert("Se ha Actualizado Cliente exitosamente");
            console.log("Todo OK");
        }
    });
}
function borrarCliente(idElemento){
    let id = parseInt(idElemento);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Client" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoCliente").empty();
            traerInfCliente();
            alert("Se ha eliminado cliente exitosamente");
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