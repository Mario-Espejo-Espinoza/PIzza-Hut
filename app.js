// NAVEGACIÓN
function entrarVisitante() {
    localStorage.setItem("modo", "visitante");
    window.location.href = "areas.html";
}

function irLogin() {
    window.location.href = "login.html";
}

function volverInicio() {
    window.location.href = "index.html";
}

function volver() {
    window.location.href = "areas.html";
}

// LOGIN
function login() {
    const u = document.getElementById("usuario").value;
    const p = document.getElementById("password").value;

    if (u === "admin" && p === "1234") {
        localStorage.setItem("modo", "admin");
        window.location.href = "areas.html";
    } else {
        alert("Credenciales incorrectas");
    }
}

// ÁREA
function continuar() {
    const area = document.getElementById("area").value;

    if (!area) {
        alert("Seleccione un área");
        return;
    }

    localStorage.setItem("area", area);
    window.location.href = "panel.html";
}

// PANEL
let temp = [];

if (window.location.pathname.includes("panel.html")) {

    const modo = localStorage.getItem("modo");
    const area = localStorage.getItem("area");

    const titulo = document.getElementById("titulo");
    const info = document.getElementById("info");
    const tabla = document.getElementById("tabla");
    const guardarBtn = document.getElementById("guardarBtn");

    titulo.innerText = (area || "").toUpperCase();

    if (modo === "admin") {
        info.innerText = "MODO ADMINISTRADOR";
    } else {
        info.innerText = "MODO VISITANTE";
        guardarBtn.style.display = "none";
    }

    const data = JSON.parse(localStorage.getItem(area)) || [];
    temp = [...data];

    for (let i = 0; i < 10; i++) {

        let tr = document.createElement("tr");

        // 🔥 IMAGEN + NOMBRE
        let td1 = document.createElement("td");
        td1.innerHTML = `
            <img src="./img/taper.png" style="width:60px;"><br>
            Taper ${i + 1}
        `;

        let td2 = document.createElement("td");
        td2.innerText = "✔";

        let td3 = document.createElement("td");
        td3.innerText = "✖";

        let estado = temp[i] || "bien";

        function pintar() {
            td2.className = "";
            td3.className = "";

            if (estado === "bien") td2.classList.add("activo");
            else td3.classList.add("roto");
        }

        pintar();

        if (modo === "admin") {
            td2.onclick = () => {
                estado = "bien";
                temp[i] = estado;
                pintar();
            };

            td3.onclick = () => {
                estado = "roto";
                temp[i] = estado;
                pintar();
            };
        }

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        tabla.appendChild(tr);
    }

    // GUARDAR
    guardarBtn.addEventListener("click", function () {
        localStorage.setItem(area, JSON.stringify(temp));
        alert("Cambios guardados");
    });
}