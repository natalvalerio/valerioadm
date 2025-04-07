//--------------------------------------------------------------------------
function populateRowT(row, data = {}) {
    row.dataset.id = data.id || ""; // Armazena o ID da linha

    row.appendChild(document.createElement("td")).appendChild(document.createElement("input")).value = data.status || "";

    // Botão Atualizar
    let updateBtn = document.createElement("span");
    updateBtn.textContent = "✅";
    updateBtn.onclick = () => ATUALIZART(row);
    row.appendChild(document.createElement("td")).appendChild(updateBtn);

    // Botão Excluir
    let deleteBtn = document.createElement("span");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => EXCLUIRT(row);
    row.lastChild.appendChild(deleteBtn);
}

//--------------------------------------------------------------------------
function NOVOT(data = {}) {
    let tbody = document.querySelector("tbody");
    let row = document.createElement("tr");
    populateRowT(row, data);
    tbody.insertBefore(row, tbody.firstChild); // Insere a nova linha no topo
}

//--------------------------------------------------------------------------
async function SALVART() {
    let tbody = document.querySelector("tbody");
    let firstRow = tbody.rows[0]; // Captura a primeira linha
    let data = {};

    firstRow.querySelectorAll("td").forEach((td, index) => {
        if (index === 0) data.status = td.querySelector("input").value;
    });

    let sqlQuery = `insert into status (status) values ('${data.status}')`;
    let encodedQuery = encodeURIComponent(sqlQuery);

    try {
        let response = await fetch(`https://natalvalerio.pythonanywhere.com/api/sql?sql=${encodedQuery}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            alert("Erro ao salvar dados!");
        } else {
            alert("Dados salvos com sucesso!");
            fetchDataT();
        }
    } catch (error) {
        alert("Erro ao salvar dados.");
        console.error("Erro ao salvar dados: ", error);
    }
}

//--------------------------------------------------------------------------
async function ATUALIZART(row) {
    let id = row.dataset.id;
    if (!id) {
		SALVART()
        //alert("Não é possível atualizar uma linha sem ID.");
        return;
    }

    let data = {};
    row.querySelectorAll("td").forEach((td, index) => {
        if (index === 0) data.status = td.querySelector("input").value;
    });

    let sqlQuery = `update status set status='${data.status}' where id=${id}`;
    let encodedQuery = encodeURIComponent(sqlQuery);

    try {
        let response = await fetch(`https://natalvalerio.pythonanywhere.com/api/sql?sql=${encodedQuery}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            alert("Erro ao atualizar dados!");
        } else {
            alert("Dados atualizados com sucesso!");
            fetchDataT();
        }
    } catch (error) {
        alert("Erro ao atualizar dados.");
        console.error("Erro ao atualizar dados: ", error);
    }
}

//--------------------------------------------------------------------------
async function EXCLUIRT(row) {
    let id = row.dataset.id;
    if (!id) {
        alert("Não é possível excluir uma linha sem ID.");
        return;
    }

    let sqlQuery = `delete from status where id=${id}`;
    let encodedQuery = encodeURIComponent(sqlQuery);

    if (confirm("Tem certeza de que deseja excluir esta linha?")) {
        try {
            let response = await fetch(`https://natalvalerio.pythonanywhere.com/api/sql?sql=${encodedQuery}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                alert("Erro ao excluir dados!");
            } else {
                alert("Dados excluídos com sucesso!");
                fetchDataT();
            }
        } catch (error) {
            alert("Erro ao excluir dados.");
            console.error("Erro ao excluir dados: ", error);
        }
    }
}

//--------------------------------------------------------------------------
async function fetchDataT() {
    document.getElementById("loader").style.display = "flex"; 
	
    try {
        let query = `select * from status`;
        let response = await fetch(`https://natalvalerio.pythonanywhere.com/api/sql?sql=${query}`);
        let data = await response.json();
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        data.forEach(item => NOVOT(item));
    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
    }
    document.getElementById("loader").style.display = "none"; 
}

window.onload = fetchDataT;
