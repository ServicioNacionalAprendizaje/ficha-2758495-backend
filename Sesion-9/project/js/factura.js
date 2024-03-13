function All() {
    $.ajax({
        url: 'http://localhost:9000/movil/api/Factura',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // Itera sobre los datos obtenidos
            var html = ``;
            $.each(data, function (index, factura) {
                html += `<tr>
                <th>`+ factura.fecha + `</th>
                <th>`+ factura.totalPagar + `</th>
                <th>`+ factura.clienteId.nombre + ` `+ factura.clienteId.apellido + `</th>
                <th>`+ (factura.estado == true ? 'Activo':'Inactivo') + `</th>
                <th>Editar </th>
                <th><input type="button" class="btn btn-primary" value="Editar" onclick="FindById(`+ factura.id + `)"></th>
                <th><input type="button" class="btn btn-primary" value="Eliminar" onclick="Delete(`+ factura.id + `)"></th></tr>`;
            });

            // Agrega el HTML al contenedor        
            $('#data').html(html);
            CleanData();
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos de la API:', error);
        }
    });
}

function FindById(id) {
    $.ajax({
        url: 'http://localhost:9000/movil/api/Factura/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#id').val(data.id);
            $('#fecha').val(new Date(data.fecha).toISOString().split('T')[0]);
            $('#totalPagar').val(data.totalPagar);
            $('#clienteId').val(data.clienteId.id);
            $('#estado').val((data.estado == true ? 1 : 0));

             // Cambiar el evento onclick y el valor del botón
             $("#botones input").attr("onclick", "Update()").val("Actualizar");
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos de la API:', error);
        }
    });
}

function Delete(id) {
    $.ajax({
        url: 'http://localhost:9000/movil/api/Factura/' + id,
        type: 'DELETE',
        success: function (data) {
            alert('Factura eliminado');
            //SweeAlert
            All();
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos de la API:', error);
        }
    });
}

function Save() {
    parametros = {
        "fecha": new Date($('#fecha').val()),
        "totalPagar": parseFloat($('#totalPagar').val()),
        "clienteId":{
            "id": $('#clienteId').val()
        },
        "estado": parseInt($('#estado').val())
    };
    $.ajax({
        url: 'http://localhost:9000/movil/api/Factura',
        method: 'POST',  // Cambia a 'PUT' si es una actualización
        contentType: 'application/json',
        data: JSON.stringify(parametros),
        success: function (response) {
            alert('Datos guardados exitosamente:', response);
            All();
        },
        error: function (xhr, status, error) {
            console.error('Error al guardar los datos de la API:', error);
        }
    });
}

function Update() {
    parametros = {
        "fecha": new Date($('#fecha').val()),
        "totalPagar": parseFloat($('#totalPagar').val()),
        "clienteId":{
            "id": $('#clienteId').val()
        },
        "estado": parseInt($('#estado').val())
    };
    $.ajax({
        url: 'http://localhost:9000/movil/api/Factura/'+$('#id').val(),
        method: 'PUT', 
        contentType: 'application/json',
        data: JSON.stringify(parametros),
        success: function (response) {
            alert('Datos modificados exitosamente:', response);
            All();
        },
        error: function (xhr, status, error) {
            console.error('Error al guardar los datos de la API:', error);
        }
    });
}

function CleanData() {
    $('#id').val('');
    $('#fecha').val('');
    $('#totalPagar').val('');
    $('#clienteId').val('');
    $('#estado').val('');
    $("#botones input").attr("onclick", "Save()").val("Guardar");
}



