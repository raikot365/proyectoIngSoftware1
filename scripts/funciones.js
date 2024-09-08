function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

let stageCount = 1;
let highlightDates = [];
let calendarInstance;

// Función para abrir la ventana emergente para crear un nuevo proyecto
function openCreateProjectModal() {
    const modal = document.getElementById('create-project-modal');
    modal.style.display = 'block';
}

// Función para cerrar la ventana emergente para crear un nuevo proyecto
function closeCreateProjectModal() {
    const modal = document.getElementById('create-project-modal');
    modal.style.display = 'none';
    document.getElementById('create-project-form').reset();
    document.getElementById('stages-container').innerHTML = '';
    stageCount = 1;
}

// Función para agregar una nueva etapa en la ventana emergente
function addStage() {
    const stagesContainer = document.getElementById('stages-container');

    const stageDiv = document.createElement('div');
    stageDiv.classList.add('stage');

    stageDiv.innerHTML = `
        <label for="stage-name-${stageCount}">Nombre de la Etapa:</label>
        <input type="text" id="stage-name-${stageCount}" name="stage-name-${stageCount}" required><br><br>
        <label for="stage-date-${stageCount}">Fecha de Finalización:</label>
        <input type="date" id="stage-date-${stageCount}" name="stage-date-${stageCount}" required><br><br>
    `;

    stagesContainer.appendChild(stageDiv);
    stageCount++;
}

// Función para agregar un nuevo proyecto desde la ventana emergente
function addNewProject(event) {
    event.preventDefault();

    const projectName = document.getElementById('project-name').value;
    // Obtener el nombre de la persona seleccionada
    const personaKey = document.getElementById("selectPersona").value;
    let personaNombre = "Sin asignar";
    if (personaKey) {
        const persona = JSON.parse(localStorage.getItem(personaKey));
        if (persona && persona.nombre) {
            personaNombre = persona.nombre;
        }
    }
    // Obtener todas las etapas
    const stages = [];
    const stageInputs = document.querySelectorAll('#stages-container .stage');
    stageInputs.forEach(stage => {
        const stageName = stage.querySelector('input[type="text"]').value;
        const stageDate = stage.querySelector('input[type="date"]').value;
        stages.push({ name: stageName, date: stageDate });
    });

    // Crear nuevo proyecto HTML
    const newProjectCard = document.createElement('div');
    newProjectCard.classList.add('project-card-1');

    let stagesHTML = '';
    stages.forEach(stage => {
        stagesHTML += `<p>${stage.name}: ${stage.date}</p>`;
    });

   
    newProjectCard.innerHTML = `
        <h3>${projectName}</h3>
        <h3>Cliente: ${personaNombre}</h3>
        ${stagesHTML}
    `;

    const activeProjects = document.getElementById('active-projects');
    activeProjects.appendChild(newProjectCard);

    // Agregar la fecha de la última etapa a las fechas resaltadas
    if (stages.length > 0) {
        const lastStageDate = stages[stages.length - 1].date;
        highlightDates.push(lastStageDate);
        updateCalendar();
    }

    // Cerrar la ventana emergente
    closeCreateProjectModal();
}



// Inicializar el calendario al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const calendarInput = document.getElementById('calendar');
    calendarInstance = flatpickr(calendarInput, {
        locale: 'es', // Ajuste del idioma a español
        dateFormat: 'Y-m-d', // Formato de fecha (año-mes-día)
        inline: true, // Muestra el calendario de forma inline
        onDayCreate: function(dObj, dStr, fp, dayElem) {
            if (highlightDates.includes(fp.formatDate(dayElem.dateObj, 'Y-m-d'))) {
                dayElem.classList.add('highlight-date'); // Agrega una clase para resaltar la fecha
            }
        }
    });
});


// Función para actualizar dinámicamente el título de la ventana emergente
function updateModalTitle(projectName) {
    const modalTitle = document.getElementById('modal-title');
    modalTitle.textContent = projectName.trim() === '' ? 'Nuevo Proyecto' : projectName;
}


function validar() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        // Redirigir a la página de inicio
        window.location.href = './index.html';
    } else {
        alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
}

// Función que muestra un mensaje al presionar un botón
function mostrarMensaje() {
    alert("Se cargó la obra correctamente");
}


const personas = [
    { nombre: "Juan Pérez", edad: 30, correo: "juan.perez@example.com" },
    { nombre: "María García", edad: 25, correo: "maria.garcia@example.com" },
    { nombre: "Luis Martínez", edad: 40, correo: "luis.martinez@example.com" }
];

// Guardar cada persona en localStorage
personas.forEach((persona, index) => {
    localStorage.setItem(`persona${index + 1}`, JSON.stringify(persona));
});


// Obtener la referencia del select
const selectPersona = document.getElementById("selectPersona");

// Cargar las personas desde localStorage
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("persona")) {
        const persona = JSON.parse(localStorage.getItem(key));
        const option = document.createElement("option");
        option.value = key;
        option.textContent = persona.nombre;
        selectPersona.appendChild(option);
    }
}

// Mostrar detalles de la persona seleccionada
selectPersona.addEventListener("change", function() {
    const key = this.value;
    const detallesPersona = document.getElementById("detallesPersona");

    if (key) {
        const persona = JSON.parse(localStorage.getItem(key));
        detallesPersona.innerHTML = `
            <p>Nombre: ${persona.nombre}</p>
            <p>Edad: ${persona.edad}</p>
            <p>Correo: ${persona.correo}</p>
        `;
    } else {
        detallesPersona.innerHTML = "";
    }
});

//función para comprobar los campos

function comprobarSeleccion() {
    const selectPersona = document.getElementById("selectPersona");
    const personaSeleccionada = selectPersona.value;
    const projectName = document.getElementById('project-name').value;
    

    if (personaSeleccionada && projectName) {
        mostrarMensaje();
    } else {
        console.log("No se ha seleccionado ninguna persona.");
        return false;
    }
}