document.addEventListener("DOMContentLoaded", () => {
    fetch("/proyectos")
        .then(response => response.json())
        .then(data => {
            const proyectosSection = document.getElementById("proyectos");
            const lista = document.createElement("ul");
            data.forEach(proyecto => {
                const item = document.createElement("li");
                item.textContent = proyecto.titulo; // asumiendo que la tabla tiene un campo "nombre"
                lista.appendChild(item);
            });
            proyectosSection.appendChild(lista);
        })
        .catch(error => {
            console.error("Error cargando proyectos:", error);
        });
});
