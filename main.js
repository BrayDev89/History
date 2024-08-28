function manejarInterseccion(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}

const observer = new IntersectionObserver(manejarInterseccion, {
    threshold: 0.1
});

function abrirModal(nombre, descripcion, imagen, repo, demo) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-title').textContent = nombre;
    document.getElementById('modal-description').textContent = descripcion;
    document.getElementById('modal-image').src = imagen;
    document.getElementById('modal-repo').href = repo;
    document.getElementById('modal-demo').href = demo;
    modal.style.display = 'block';
}

function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

document.querySelector('.close').addEventListener('click', cerrarModal);

window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        cerrarModal();
    }
});

function crearProyecto(nombre, descripcion, imagenSmall, imagenMedium, imagenLarge, repo, demo) {
    const proyecto = document.createElement('div');
    proyecto.classList.add('proyecto');
    proyecto.innerHTML = `
        <h2>${nombre}</h2>
        <p>${descripcion}</p>
        <picture>
            <source media="(max-width: 600px)" srcset="${imagenSmall}">
            <source media="(max-width: 1200px)" srcset="${imagenMedium}">
            <img src="${imagenLarge}" alt="${nombre}">
        </picture>
    `;

    proyecto.addEventListener('click', () => {
        abrirModal(nombre, descripcion, imagenLarge, repo, demo);
    });

    return proyecto;
}

const proyectos = [
    {
        nombre: 'Gestor de Contraseñas',
        descripcion: 'Descripción del proyecto 1',
        imagenSmall: 'images/optimized/small/gestor.jpg',
        imagenMedium: 'images/optimized/medium/gestor.jpg',
        imagenLarge: 'images/optimized/large/gestor.jpg',
        tecnologias: ['JavaScript'],
        repo: 'https://github.com/BrayDev89/History.git',
        demo: 'https://demo.com/proyecto1'
    },
    {
        nombre: 'Reloj Mundial',
        descripcion: 'Descripción del proyecto 2',
        imagenSmall: 'images/optimized/small/reloj.jpg',
        imagenMedium: 'images/optimized/medium/reloj.jpg',
        imagenLarge: 'images/optimized/large/reloj.jpg',
        tecnologias: ['JavaScript'],
        repo: 'https://github.com/usuario/proyecto2',
        demo: 'https://demo.com/proyecto2'
    },
    {
        nombre: 'Simulador de dados',
        descripcion: 'Descripción del proyecto 3',
        imagenSmall: 'images/optimized/small/relleno.jpg',
        imagenMedium: 'images/optimized/medium/relleno.jpg',
        imagenLarge: 'images/optimized/large/relleno.jpg',
        tecnologias: ['Python'],
        repo: 'https://github.com/usuario/proyecto3',
        demo: 'https://demo.com/proyecto3'
    },
    {
        nombre: 'Gestor de Contraseña',
        descripcion: 'Descripción del proyecto 4',
        imagenSmall: 'images/optimized/small/blob.png',
        imagenMedium: 'images/optimized/medium/blob.png',
        imagenLarge: 'images/optimized/large/blob.png',
        tecnologias: ['Python'],
        repo: 'https://github.com/usuario/proyecto4',
        demo: 'https://demo.com/proyecto4'
    },
    {
        nombre: 'Prueba',
        descripcion: 'Descripción del proyecto 5',
        imagenSmall: 'images/optimized/small/Yo.jpg',
        imagenMedium: 'images/optimized/medium/Yo.jpg',
        imagenLarge: 'images/optimized/large/Yo.jpg',
        tecnologias: ['Pruebas'],
        repo: 'https://github.com/usuario/proyecto5',
        demo: 'https://demo.com/proyecto5'
    },
    {
        nombre: 'Prueba 2',
        descripcion: 'Descripción del proyecto 6',
        imagenSmall: 'images/optimized/small/Yo.jpg',
        imagenMedium: 'images/optimized/medium/Yo.jpg',
        imagenLarge: 'images/optimized/large/Yo.jpg',
        tecnologias: ['Pruebas'],
        repo: 'https://github.com/usuario/proyecto6',
        demo: 'https://demo.com/proyecto6'
    }
];

const sectionProyectos = document.querySelector('.projects');

function filtrarProyectos(tecnologia) {
    sectionProyectos.innerHTML = '';

    const proyectosFiltrados = proyectos.filter(proyecto =>
        tecnologia === 'all' || proyecto.tecnologias.includes(tecnologia)
    );

    proyectosFiltrados.forEach(proyecto => {
        const proyectoElement = crearProyecto(
            proyecto.nombre,
            proyecto.descripcion,
            proyecto.imagenSmall,
            proyecto.imagenMedium,
            proyecto.imagenLarge,
            proyecto.repo,
            proyecto.demo
        );
        sectionProyectos.appendChild(proyectoElement);
        observer.observe(proyectoElement);
    });
}

filtrarProyectos('all');

document.querySelectorAll('.filters button').forEach(button => {
    button.addEventListener('click', () => {
        const tecnologia = button.getAttribute('data-filter');
        console.log('Boton clicado:', tecnologia);
        filtrarProyectos(tecnologia);
    });
});
