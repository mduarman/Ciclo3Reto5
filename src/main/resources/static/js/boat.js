//let ruta = "http://150.136.171.92:8080"
let ruta ="http://localhost:8080"

function getInfBoat(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Boat/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoBote").empty();
            showBoat(respuesta);
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
function queryByIdBoat(){
    let id = $("#id").val();
    if(id === ""){
        alert("Debe ingresar un ID para traer un barco")
    }else{
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Boat" + "/" + id,
            type:"GET",
            datatype:"JSON",
            contentType: "application/json",
            success: function(respuesta){
                console.log(respuesta);
                $("#resultadoBote").empty();
                if(respuesta != null){
                    $("#id").val(respuesta.id);
                    $("#brand").val(respuesta.brand);
                    $("#year").val(respuesta.year);
                    $("#name").val(respuesta.name);
                    $("#description").val(respuesta.description);
                    let myTable = "<table>";
                    myTable += "<span>" + "Información Barco" + "</span>";
                    myTable += "<thead>";
                    myTable += "<tr>";
                    myTable += "<td>"+"ID"+"</td>";
                    myTable += "<td>"+"BRAND"+"</td>";
                    myTable += "<td>"+"YEAR"+"</td>";
                    myTable += "<td>"+"NAME"+"</td>";
                    myTable += "<td>"+"DESCRIPTION"+"</td>";
                    myTable += "<td>"+"CATEGORIA"+"</td>";
                    myTable += "<td>"+"BUTTON"+"</td>";
                    myTable += "</tr>";
                    myTable += "</thead>";
                    myTable += "<tr>"
                    myTable += "<td>" + respuesta.id + "</td>";
                    myTable += "<td>" + respuesta.brand + "</td>";
                    myTable += "<td>" + respuesta.year + "</td>";
                    myTable += "<td>" + respuesta.name + "</td>";
                    myTable += "<td>" + respuesta.description + "</td>";
                    if(respuesta.category != null)
                        myTable += "<td>" + respuesta.category.name + "(" + respuesta.category.description + ")" + "</td>";
                    else
                        myTable += "<td>" + "Sin categoria asignada" + "</td>";
                    myTable += "<td> <button onclick='removeInfBoat("+respuesta.id+")'>Borrar</button>";
                    myTable += "</table>";
                    $("#resultadoBote").append(myTable);
                    let myTable2 = "<table>";
                    myTable2 += "<span>" + "Información de Reservas" + "</span>";
                    myTable2 += "<thead>";
                    myTable2 += "<tr>";
                    myTable2 += "<td>"+"STARTDATE"+"</td>";
                    myTable2 += "<td>"+"DEVOLUTIONDATE"+"</td>";
                    myTable2 += "<td>"+"STATUS"+"</td>";
                    myTable2 += "<td>"+"CLIENT"+"</td>";
                    myTable2 += "<td>"+"SCORE"+"</td>";
                    myTable2 += "</tr>";
                    myTable2 += "</thead>";
                    myTable2 += "<tr>"
                    for(i=0; i<respuesta.reservations.length; i++){
                        myTable2 += "<tr>";
                        myTable2 += "<td>" + respuesta.reservations[i].startDate + "</td>";
                        myTable2 += "<td>" + respuesta.reservations[i].devolutionDate + "</td>";
                        myTable2 += "<td>" + respuesta.reservations[i].status + "</td>";
                        myTable2 += "<td>" + respuesta.reservations[i].client.name + "</td>";
                        if(respuesta.score != null)
                            myTable2 += "<td>" + respuesta.score.stars + "</td>";
                        else
                            myTable2 += "<td>" + "Sin puntuación" + "</td>";
                        myTable2 += "</tr>";
                    }
                    myTable2 += "</table>";
                    $("#resultadoBote2").append(myTable2);
                    alert("Barco encontrado satisfactoriamente")
                }else{
                    alert("el ID no se encuentra resgistrado para poder traer un barco")
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
function showBoat(respuesta){
    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr>";
    myTable += "<td>"+"ID"+"</td>";
    myTable += "<td>"+"BRAND"+"</td>";
    myTable += "<td>"+"YEAR"+"</td>";
    myTable += "<td>"+"DESCRIPTION"+"</td>";
    myTable += "<td>"+"NAME"+"</td>";
    myTable += "<td>"+"CATEGORIA"+"</td>";
    myTable += "<td>"+"BUTTON"+"</td>";
    myTable += "</tr>";
    myTable += "</thead>";
    for(i = 0; i < respuesta.length; i++){
        if(respuesta[i].category == null){
            vacio = "Sin categoria asignada";
            myTable += "<tr>";
            myTable += "<td>" + respuesta[i].id + "</td>";
            myTable += "<td>" + respuesta[i].brand + "</td>";
            myTable += "<td>" + respuesta[i].year + "</td>";
            myTable += "<td>" + respuesta[i].description + "</td>";
            myTable += "<td>" + respuesta[i].name + "</td>";
            myTable += "<td>" + vacio + "</td>";
            myTable += "<td> <button onclick='removeInfBoat("+respuesta[i].id+")'>Borrar</button>";
            myTable += "</tr>";
        }else{
            myTable += "<tr>";
            myTable += "<td>" + respuesta[i].id + "</td>";
            myTable += "<td>" + respuesta[i].brand + "</td>";
            myTable += "<td>" + respuesta[i].year + "</td>";
            myTable += "<td>" + respuesta[i].description + "</td>";
            myTable += "<td>" + respuesta[i].name + "</td>";
            myTable += "<td>" + respuesta[i].category.name + " " + "(" + respuesta[i].category.description + ")" + "</td>";
            myTable += "<td> <button onclick='removeInfBoat("+respuesta[i].id+")'>Borrar</button>";
            myTable += "</tr>";
        }
    }
    /*for(const i in respuesta){
         console.log(respuesta[i].category)
         myTable += "<tr>";
         myTable += "<td>" + respuesta[i].id + "</td>";
         myTable += "<td>" + respuesta[i].brand + "</td>";
         myTable += "<td>" + respuesta[i].year + "</td>";
         myTable += "<td>" + respuesta[i].description + "</td>";
         myTable += "<td>" + respuesta[i].name + "</td>";
         myTable += "<td> <button onclick='removeInfBoat("+respuesta[i].id+")'>Borrar</button>";
         myTable += "</tr>";
    }*/
    myTable += "</table>";
    $("#resultadoBote").append(myTable);
}
function addInfoBoat(){
    if(listCategory.value == ""){
        let myData = {
            brand:$("#brand").val(),
            year:$("#year").val(),
            name:$("#name").val(),
            description:$("#description").val(),
        }
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Boat/save",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            success:function(respuesta){
                $("#resultadoBote").empty();
                $("#brand").val("");
                $("#year").val("");
                $("#name").val("");
                $("#description").val("");
                $("#category").val("");
                alert("Se ha creado bote exitosamente")
                getInfBoat();
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
        let myData2 = {
            id:listCategory.value
        };
        let myData = {
            brand:$("#brand").val(),
            year:$("#year").val(),
            name:$("#name").val(),
            description:$("#description").val(),
            category:myData2
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Boat/save",
            type:"POST",
            data:dataToSend,
            datatype:"JSON",
            success:function(respuesta){
                $("#resultadoBote").empty();
                $("#brand").val("");
                $("#year").val("");
                $("#name").val("");
                $("#description").val("");
                $("#category").val("");
                alert("Se ha creado bote exitosamente")
                getInfBoat();
            }
        });
    }
}
function modInfBoat(){
    if(listCategory.value != ""){
        let myData2 = {
            id:listCategory.value
        };
        let myData = {
            id:$("#id").val(),
            brand:$("#brand").val(),
            year:$("#year").val(),
            name:$("#name").val(),
            description:$("#description").val(),
            category:myData2
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Boat/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultadoBote").empty();
                $("#brand").val("");
                $("#year").val("");
                $("#name").val("");
                $("#description").val("");
                alert("Se ha actualizado barco exitosamente")
                getInfBoat();
            }
        });
    }else{
        let myData = {
            id:$("#id").val(),
            brand:$("#brand").val(),
            year:$("#year").val(),
            name:$("#name").val(),
            description:$("#description").val(),
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Boat/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success:function(respuesta){
                $("#resultadoBote").empty();
                $("#brand").val("");
                $("#year").val("");
                $("#name").val("");
                $("#description").val("");
                alert("Se ha actualizado barco exitosamente")
                getInfBoat();
            }
        });
    }
}
function removeInfBoat(idElemento){
    id = parseInt(idElemento);
    $.ajax({
        url: ruta + "/api/Boat" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoBote").empty();
            getInfBoat();
            alert("Se ha eliminado bote exitosamente")
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
function llenarLista(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            let listaCategory = document.getElementById("listCategory");
            for(i=0; i<respuesta.length; i++){
                let list = document.createElement('option');
                list.innerHTML = respuesta[i].name + "(" + respuesta[i].description + ")";
                list.value = respuesta[i].id;
                listaCategory.appendChild(list);
            }
        }
    })

}