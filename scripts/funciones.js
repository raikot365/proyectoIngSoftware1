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

// Función para actualizar el calendario con las fechas resaltadas
function updateCalendar() {
    const calendarInput = document.getElementById('calendar');
    if (calendarInstance) {
        calendarInstance.destroy();
    }

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

    console.log('Intento de inicio de sesión con usuario:', username, 'y contraseña:', password);

    if (username === 'admin' && password === 'admin') {
        console.log('Inicio de sesión exitoso como admin');
        // Redirigir a la página de inicio
        window.location.href = './index.html';
    } else {
        //console.log('Credenciales incorrectas. Inténtalo de nuevo.');
        alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
}

// Función que muestra un mensaje al presionar un botón
/*function mostrarMensaje() {
    alert("Se cargó la obra correctamente");
}*/
