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