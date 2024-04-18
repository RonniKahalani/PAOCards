"use strict";

/**
 * Handles the main navigator tabs.
 */
export class TabHandler {

    /**
     * Constructor.
     */
    constructor() {
        this.tabs = ["pao-home", "pao-matrix", "pao-quiz", "pao-palace", "pao-instructions"];
    }

    /**
     * Shows a given navigator tab after hiding all the tabs.
     * @param id
     */
    showTab(id) {
        for(const tab of this.tabs) {
            document.getElementById(tab).style.display = 'none';
        }
        document.getElementById(id).style.display = 'block';
    }
}