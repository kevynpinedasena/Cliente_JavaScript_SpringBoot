function obtenerPersona() {

    let documento = document.getElementById("documento");
    let url="http://localhost:8080/servicio/personas/"+documento.value;

    if(documento.value == ""){
        Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'el campo de documento es requerido',
            confirmButtonText: 'OK'
        })
    }
    else{
        fetch(url)
        .then((respuesta)=>{
            console.log(respuesta);
            if(respuesta.status==404){
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'el documento no existe',
                    confirmButtonText: 'OK'
                })
            }
            
            return respuesta.json();
        }).then((respuest)=>{
            console.log(respuest);
           
            document.getElementById("nombre").value=respuest.nombre;
            document.getElementById("telefono").value=respuest.telefono;
            document.getElementById("edad").value=respuest.edad;
            document.getElementById("profesion").value=respuest.profesion;
            document.getElementById("password").value=respuest.password;
            document.getElementById("tipo").value=respuest.tipo;
        })
    }
}

function registrar(){

    let documento=document.getElementById("documento");
    let nombre=document.getElementById("nombre");
    let telefono=document.getElementById("telefono");
    let edad=document.getElementById("edad");
    let profecion=document.getElementById("profesion");
    let password=document.getElementById("password");
    let tipo=document.getElementById("tipo");

    if(documento=="" || edad=="" || nombre=="" || password=="" || profecion=="" || telefono=="" || tipo==""){
        Swal.fire({
            title: 'Error!',
            text: 'asegurse de llenar todos los campos',
            icon: 'info',
            confirmButtonText: 'OK'
        })
    }
    else{
        let url="http://localhost:8080/servicio/guardar";

        fetch(url,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                documento: documento.value,
                nombre: nombre.value,
                telefono: telefono.value,
                edad: edad.value,
                profesion: profecion.value,
                password: password.value,
                tipo: tipo.value
            })
        })
    
        .then(response => response)
        .then((respuesta)=> {
            console.log(respuesta);
    
            if(respuesta.status==200){
                limpiar();
                Swal.fire({
                    title: 'Registrado',
                    text: 'la persona se registro',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }
            else{
                if(respuesta.status==404){
                    Swal.fire({
                        title: 'Error!',
                        text: 'la persona se no se pudo resgistrar',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                }
                else{
                    Swal.fire({
                        title: 'Error!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            }
        })
    }    
}

function actualizar(){
    
    let url="http://localhost:8080/servicio/actualizar";

    fetch(url,{
        method:"PUT",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            documento:documento.value,
            nombre: nombre.value,
            telefono: telefono.value,
            edad: edad.value,
            profesion: profesion.value,
            password: password.value,
            tipo: tipo.value
        })
    })
    .then((respuesta)=>{
        console.log(respuesta);
        if(respuesta.status==200){
            Swal.fire({
                title: 'Actualizado!',
                text: 'la persona se actualizo correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        }
        else{
            if(respuesta.status==404){
                Swal.fire({
                    title: 'Error!',
                    text: 'Tiene que llenar el campo de documento buscar y actualizar',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                })
            }
            else{
                Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }
        return respuesta.json();
    }) 
    .then((respuesta)=>{
        console.log(respuesta);
        document.getElementById("edad").value=respuesta.edad;
        document.getElementById("nombre").value=respuesta.nombre;
        document.getElementById("password").value=respuesta.password;
        document.getElementById("profesion").value=respuesta.profesion;
        document.getElementById("telefono").value=respuesta.telefono;
        document.getElementById("tipo").value=respuesta.tipo;
           
        limpiar();       
    })
}

function eliminar(){
    let documento=document.getElementById("documento");
    let url="http://localhost:8080/servicio/eliminar/"+documento.value;

    if(documento.value == ""){
        Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Primero tiene que llenar el campo de documento o buscar a la persona que quiere eliminar',
            confirmButtonText: 'OK'
        })
    }
    else{
        fetch(url,{
            method:"DELETE",
        })
        .then(response=> response) 
        .then((respuesta)=>{
            console.log(respuesta);
            if(respuesta.status==200){
                limpiar();
                Swal.fire({
                    title: 'Eliminado!',
                    text: 'la persona se elimino correctamente',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }
            else{
                if(respuesta.status==204){
                    Swal.fire({
                        title: 'Error!',
                        text: 'la persona se no se pudo eliminar',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                }else{
                    Swal.fire({
                        title: 'Error!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            }      
        })  
    }
}


function limpiar(){
    document.getElementById("documento").value="";
    document.getElementById("nombre").value="";
    document.getElementById("telefono").value="";
    document.getElementById("edad").value="";
    document.getElementById("profesion").value="";
    document.getElementById("password").value="";
    document.getElementById("tipo").value="";
}