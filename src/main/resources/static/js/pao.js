"use strict";

async function loadMatrix(id) {

    const template = localStorage.getItem("pao-template");
    if(template) {
        document.getElementById("content").innerHTML = template;
    }

    const response = await fetch("http://localhost:8080/api/v1/pao/" + id);
    if(response.ok) {
        const matrix = await response.json();
        console.log(matrix);

        var paoRows = document.getElementById('pao-rows').getElementsByClassName('pao-row');
        for( let rowIndex=0; rowIndex< paoRows.length; rowIndex++ )
        {

        var childDivs = paoRows[rowIndex].getElementsByTagName('div');

        let matrixIndex = -1;
        switch (rowIndex) {
            case 0: matrixIndex = "hearts"; break;
            case 1: matrixIndex = "spades"; break;
            case 2: matrixIndex = "diamonds"; break;
            case 3: matrixIndex = "clubs"; break;
        }
        var suit = matrix[matrixIndex];
        for( let i=0; i< childDivs.length; i++ )
        {
            childDivs[i].innerHTML = "<img src='" + suit[i].image+"' width='50' height='100' alt=''>";
        }

        }
        return matrix;
    }

}

/**
 * Load template from file.
 */
var fileURL = "pao-template.html";

fetch(`${fileURL}`).then(function(response) {
    response.text().then(function(text) {
        console.log(text); // output the file content as text
        // put data in localStorage or sessionStorage here
        localStorage.setItem("pao-template", text);
    })
});