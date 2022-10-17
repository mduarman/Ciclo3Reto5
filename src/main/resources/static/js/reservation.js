//let ruta = "http://150.136.171.92:8080"
let ruta ="http://localhost:8080"

function getReservations(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoReservaciones").empty();
            $("#messages").empty();
            showReservations(respuesta);
        },
        error: function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Peticion completada");
        }
    });
}
function queryByIdReservation(){
    let id = $("#SetIdReservation").val();
    if(id == ""){
        alert("Debe digitar el ID")
    }else{
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Reservation" + "/" + id,
            type:"GET",
            datatype:"JSON",
            success: function(respuesta){
                console.log(respuesta);
                $("#resultadoReservaciones").empty();
                if(respuesta != null){
                    $("#idReservation").val(respuesta.idReservation);
                    $("#startDate").val(respuesta.startDate);
                    $("#devolutionDate").val(respuesta.devolutionDate);
                    $("#messages").empty();
                    let myTable = "<table>";
                    myTable += "<span>" + "Información de Reserva" + "</span>";
                    myTable += "<thead>";
                    myTable += "<tr>";
                    myTable += "<td>"+"STATUS"+"</td>";
                    myTable += "<td>"+"BARCO"+"</td>";
                    myTable += "<td>"+"CLIENTE"+"</td>";
                    myTable += "<td>"+"SCORE"+"</td>";
                    myTable += "</tr>";
                    myTable += "</thead>";
                    myTable += "<tr>";
                    myTable += "<td>" + respuesta.status + "</td>";
                    if(respuesta.category != null)
                        myTable += "<td>" + respuesta.boat.name + "(" + respuesta.category.name + " - " + respuesta.category.description + ")" + "</td>";
                    else
                        myTable += "<td>" + respuesta.boat.name + "(" + "Sin categoria asignada" + "</td>";
                    myTable += "<td>" + respuesta.client.name + "</td>";
                    if(respuesta.score != null)
                        myTable += "<td>" + respuesta.score.stars + "</td>";
                    else
                        myTable += "<td>" + "Sin puntuación" + "</td>";
                    myTable += "</tr>";
                    myTable += "</table>";
                    $("#messages").append(myTable);
                    alert("Producto encontrado satisfactoriamente")
                    }else{
                        alert("el ID no se encuentra resgistrado")
                    }
            },
            error: function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status) {
                console.log("Petición completada");
            }
        });
    }
}
function showReservations(respuesta){
    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr>";
    myTable += "<td>"+"ID"+"</td>";
    myTable += "<td>"+"STARTDATE"+"</td>";
    myTable += "<td>"+"DEVOLUTIONDATE"+"</td>";
    myTable += "<td>"+"STATUS"+"</td>";
    myTable += "<td>"+"BARCO"+"</td>";
    myTable += "<td>"+"CLIENT"+"</td>";
    myTable += "<td>"+"SCORE"+"</td>";
    myTable += "</tr>";
    myTable += "</thead>";
    for(i = 0; i < respuesta.length; i++){
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].idReservation + "</td>";
        myTable += "<td>" + respuesta[i].startDate + "</td>";
        myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
        myTable += "<td>" + respuesta[i].status + "</td>";
        if(respuesta[i].boat.category == null){
            myTable += "<td>" + respuesta[i].boat.name + " " + "(" + "Sin categoria asignada" + ")" + "</td>";
        }else{
            myTable += "<td>" + respuesta[i].boat.name + " " + "(" + respuesta[i].boat.category.name + "-" + respuesta[i].boat.category.description + ")" + "</td>";
        }
        myTable += "<td>" + respuesta[i].client.name + "</td>";
        if(respuesta[i].score == null){
            myTable += "<td>" + "Sin puntuación" + "</td>";
        }else{
            myTable += "<td>" + respuesta[i].score.name + " " + "(" + respuesta[i].score.description + ")" + "</td>";
        }
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoReservaciones").append(myTable);
}
function createReservation(){
    if(listBoats.value != "" || listClients.value != ""){
        let myData2 = {
            idClient:listClients.value
        };
        let myData3 = {
            id:listBoats.value
        };
        let myData = {
            idReservation:$("#idReservation").val(),
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:listStatus.value,
            client:myData2,
            boat:myData3,
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Reservation/save",
            type:"POST",
            data:dataToSend,
            contentType: "application/json",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultadoReservaciones").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                alert("Se ha creado la reserva exitosamente")
                getReservations();
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
        alert("Debe asignar un barco y un cliente a la reserva")
    }

}
function modReservation(){
    if(listBoats.value == "" || listClients.value == "" || listStatus.value == ""){
        alert("Debe llenar todos los campos para actualizar la reservación")
    }else{
        let myData2 = {
            idClient:listClients.value
        };
        let myData3 = {
            id:listBoats.value
        };
        let myData = {
            idReservation:$("#idReservation").val(),
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:listStatus.value,
            client:myData2,
            boat:myData3,
        };
        console.log(myData);
        let dataToSend=JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Reservation/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultadoReservaciones").empty();
                $("#idReservation").val("");
                $("#startDate").val("");
                $("#devolutionDate").val("");
                alert("Se ha actualizado la reserva exitosamente")
                getReservations();
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
function removeReservation(idElemento){
    id = parseInt(idElemento);
    $.ajax({
        url: ruta + "/api/Reservation" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservaciones").empty();
            getReservations();
            alert("Se ha cancelado la reserva exitosamente")
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


function consultaReportTime(){
    let dateA = document.getElementById("fechaInicioa");
    let dateB = document.getElementById("fechaFina");
    //dateOne.toString();
    //dateTwo.toString();
    let dateOne =dateA.value;
    let dateTwo =dateB.value;
    console.log(dateA.value);
    console.log(dateB.value);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json',
        },
        url: ruta + "/api/Reservation/report-dates" + "/"  + dateOne + "/" + dateTwo,
        type: "GET",
        contentType:"application/json",
        datatype:"JSON",
        success: function(respuesta) {
            console.log(respuesta);
            $("#consulta1").empty();
            //$("#fechaInicioa").val("");
            // $("#fechaFina").val("");
            let myTable = "<table>";
            myTable += "<span>" + "Información de Reserva" + "</span>";
            myTable += "<thead>";
            myTable += "<tr>";
            myTable += "<td>" + "ID" + "</td>";
            myTable += "<td>" + "STARTDATE" + "</td>";
            myTable += "<td>" + "DEVOLUTIONDATE" + "</td>";
            myTable += "<td>" + "STATUS" + "</td>";
            myTable += "<td>" + "BOAT" + "</td>";
            myTable += "<td>" + "CLIENT" + "</td>";
            myTable += "<td>" + "SCORE" + "</td>";
            myTable += "</tr>";
            myTable += "</thead>";
            for (let i = 0; i < respuesta.length; i++) {
                myTable += "<tr>";
                myTable += "<td>" + respuesta[i].idReservation + "</td>";
                myTable += "<td>" + respuesta[i].startDate + "</td>";
                myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
                myTable += "<td>" + respuesta[i].status + "</td>";
                if (respuesta[i].boat.category != null)
                    myTable += "<td>" + respuesta[i].boat.name + "(" + respuesta[i].boat.category.name + " - " + respuesta[i].boat.category.description + ")" + "</td>";
                else
                    myTable += "<td>" + respuesta[i].boat.name + "(" + "Sin categoria asignada" + ")" + "</td>";
                myTable += "<td>" + respuesta[i].client.name + "</td>";
                if (respuesta[i].score != null)
                    myTable += "<td>" + respuesta[i].score.stars + "</td>";
                else
                    myTable += "<td>" + "Sin puntuación" + "</td>";
                myTable += "</tr>";
            }
            $("#consulta1").append(myTable);
            alert("Consulta exitosa")
        },
        error: function (xhr, status) {
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function (xhr, status) {
            console.log("Petición completada");
        }
    })
}