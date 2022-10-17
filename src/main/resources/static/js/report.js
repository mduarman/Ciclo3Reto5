//let ruta = "http://150.136.171.92:8080"
let ruta ="http://localhost:8080"

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
        //contentType:"application/json",
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

function consultaReportStatus(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json',
        },
        url: ruta + "/api/Reservation/report-status",
        type: "GET",
        contentType:"application/json",
        datatype:"JSON",
        success: function(respuesta) {
            console.log(respuesta);
           $("#consulta1").empty();
            $("#fechaInicioa").val("");
            $("#fechaFina").val("");
            let myTable = "<table>";
            myTable += "<span>" + "Información Estado Reservas" + "</span>";
            myTable += "<thead>";
            myTable += "<tr>";
            myTable += "<td>" + "COMPLETED" + "</td>";
            myTable += "<td>" + "CANCELLED" + "</td>";
            myTable += "</tr>";
            myTable += "</thead>";
                myTable += "<tr>";
                myTable += "<td>" + respuesta.completed + "</td>";
                myTable += "<td>" + respuesta.cancelled + "</td>";
                myTable += "</tr>";
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

function consultaTopClients(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json',
        },
        url: ruta + "/api/Reservation/report-clients",
        type: "GET",
        contentType:"application/json",
        datatype:"JSON",
        success: function(respuesta) {
            console.log(respuesta);
            $("#consulta1").empty();
            let myTable = "<table>";
            myTable += "<span>" + "Información Top Clientes" + "</span>";
            myTable += "<thead>";
            myTable += "<tr>";
            myTable += "<td>" + "CLIENT" + "</td>";
            myTable += "<td>" + "RESERVAS" + "</td>";
            myTable += "</tr>";
            myTable += "</thead>";
            for(let i=0; i<respuesta.length; i++){
                myTable += "<tr>";
                myTable += "<td>" + respuesta[i].client.name + "</td>";
                myTable += "<td>" + respuesta[i].total + "</td>";
                myTable += "</tr>";
            }
            $("#consulta1").append(myTable);

            let myTable2 = "<table>";
            myTable2 += "<span>" + "RESERVAS" + "</span>";
            myTable2 += "<thead>";
            myTable2 += "<tr>";
            myTable2 += "<td>" + "CLIENT" + "</td>";
            myTable2 += "<td>" + "STARTDATE" + "</td>";
            myTable2 += "<td>" + "DEVOLUTIONDATE" + "</td>";
            myTable2 += "<td>" + "STATUS" + "</td>";
            myTable2 += "<td>" + "BOAT" + "</td>";
            myTable2 += "<td>" + "SCORE" + "</td>";
            myTable2 += "</tr>";
            myTable2 += "</thead>";
            for(let i=0; i<respuesta.length; i++){
                for(let j=0; j<respuesta[i].client.reservations.length; j++){
                    myTable2 += "<tr>";
                    myTable2 += "<td>" + respuesta[i].client.name + "</td>";
                    myTable2 += "<td>" + respuesta[i].client.reservations[j].startDate + "</td>";
                    myTable2 += "<td>" + respuesta[i].client.reservations[j].devolutionDate + "</td>";
                    myTable2 += "<td>" + respuesta[i].client.reservations[j].status + "</td>";
                    if(respuesta[i].client.reservations[j].boat.category != null)
                        myTable2 += "<td>" + respuesta[i].client.reservations[j].boat.name + "(" + respuesta[i].client.reservations[j].boat.category.name + " - " + respuesta[i].client.reservations[j].boat.category.description + ")" +"</td>";
                    else
                        myTable2 += "<td>" + respuesta[i].client.reservations[j].boat.name + "(" + "sin categoria asignada" + ")" + "</td>";
                    if(respuesta[i].client.reservations[j].score != null)
                        myTable2 += "<td>" + respuesta[i].client.reservations[j].boat.score.stars + "</td>";
                    else
                        myTable2 += "<td>" + "sin puntuación" + "</td>";
                    myTable2 += "</tr>";
                }
            }
            myTable2 += "</table>";
            $("#consulta1").append(myTable2);

            let myTable3 = "<table>";
            myTable3 += "<span>" + "Mensajes Asociados" + "</span>";
            myTable3 += "<thead>";
            myTable3 += "<tr>";
            myTable3 += "<td>" + "CLIENT" + "</td>";
            myTable3 += "<td>" + "MESSAGETEXT" + "</td>";
            myTable3 += "<td>" + "BOAT" + "</td>";
            myTable3 += "</tr>";
            myTable3 += "</thead>";
            for(let i=0; i<respuesta.length; i++){
                for(let j=0; j<respuesta[i].client.messages.length; j++){
                    myTable3 += "<tr>";
                    myTable3 += "<td>" + respuesta[i].client.name + "</td>";
                    myTable3 += "<td>" + respuesta[i].client.messages[j].messageText + "</td>";
                    if(respuesta[i].client.messages[j].boat.category != null)
                        myTable3 += "<td>" + respuesta[i].client.messages[j].boat.name + "(" + respuesta[i].client.messages[j].boat.category.name + " - " + respuesta[i].client.messages[j].boat.category.description + ")" +"</td>";
                    else
                        myTable3 += "<td>" + respuesta[i].client.messages[j].boat.name + "(" + "sin categoria asignada" + ")" + "</td>";
                    myTable3 += "</tr>";
                }
            }
            myTable3 += "</table>";
            $("#consulta1").append(myTable3);
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