document.addEventListener('DOMContentLoaded', () => {
    // Efecto máquina de escribir
    const typewriter = document.querySelector('.typewriter');
    const text = typewriter.getAttribute('data-text');
    let i = 0;

    function type() {
        if (i < text.length) {
            typewriter.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    type();

    // Scroll y detección de sección activa
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Detener observación después de activar
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Activa la animación 50px antes
    });

    document.querySelectorAll('.hidden-section').forEach(section => {
        observer.observe(section);
    });

    // Timeline dinámico (versión mejorada)
    const timelineData = [
        {
            date: "Junio 2023 - Mayo 2025",
            title: "Desarrollador Java Backend",
            company: "Grupo erre",
            bullets: [
                "Desarrollé y mantuve microservicios con Java 11 y Spring Boot",
                "Implementé APIs RESTful para sistemas core de la empresa",
                "Diseñé y optimicé esquemas de bases de datos relacionales en Oracle y MySQL",
                "Gestioné el ciclo completo de desarrollo usando Git y Maven",
                "Realicé pruebas unitarias y de integración con JUnit",
                "Probé APIs usando Postman, creando colecciones",
                "Participé activamente en ceremonias Scrum (sprints de 2 semanas)"
            ]
        },
        {
            date: "Abril 2022 - Mayo 2023",
            title: "Desarrollador Java Junior",
            company: "Kong The Ay Service",
            bullets: [
                "Desarrollo de componentes backend con Java 8 y Spring Framework",
                "Optimicé procedimientos almacenados en Oracle",
                "Trabajé con MySQL en desarrollo de nuevos módulos",
                "Implementé pruebas automatizadas con JUnit",
                "Trabajo en equipos ágiles con metodología Scrum",
                "Uso de patrones de diseño DAO y DTO",
                "Implementación con Hibernate y JPA"
            ]
        }
    ];

    const timeline = document.querySelector('.timeline');
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item`;

        const bulletsHTML = item.bullets.map(bullet =>
            `<li>${bullet}</li>`
        ).join('');

        timelineItem.innerHTML = `
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-content glass-card">
                <h3>${item.title}</h3>
                <p class="company">${item.company}</p>
                <ul class="timeline-bullets">${bulletsHTML}</ul>
            </div>
        `;
        timeline.appendChild(timelineItem);
    });
});