"use strict";

async function loadMatrix(id) {
    const response = await fetch("http://localhost:8080/api/v1/pao/" + id);
    if(response.ok) {
        const matrix = await response.json();
        console.log(matrix);
        return matrix;
    }

}

