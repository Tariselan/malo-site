/*
23 letters
1 2 3 4 5 6 7 8 9 a b c d e f g h i j k l m n
*/
import imports from './JSON/imports.json' assert {type: 'json'};
const texts = imports;

const letterMap = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"]
const scriptMap = ["lat", "cyr"]


import letters from './JSON/letter.json' assert {type: 'json'};
const letter = letters;

const body = document.body;

function parse(input, scriptNum) {
    let inputArray = input.split("");
    let output = [];
    inputArray.forEach(element => {
        let convertedInput = letter[element];
        if (convertedInput) {
            // Check if the element is found in the letter object
            output.push(convertedInput[scriptMap[scriptNum]]);
        } else if (element == " ") {
            output.push(" ");
        }
        else {
            // Handle the case where the element is not found
            console.log(`Character '${element}' not found in the letter object.`);
        }
    });
    return output.join("");
}

const consonant_place = ["Labial", "Coronal", "Palatal", "Velar", "Uvular"];
const consonant_manner = ["Nasal", "Plosive", "Fricative", "Approximant"];


// Function to generate the table
function generateTable(rows, columns, type) {
if (type == "consonant") {
    // Create a table element
    var table = document.createElement('table');

    // Create the first row with all th elements
    var headerRow = document.createElement('tr');
    for (var i = 0; i < columns; i++) {
    var th = document.createElement('th');
    if (i) {
        th.textContent = consonant_place[i-1];
    }
    headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    for (var i = 0; i < rows - 1; i++) {
    var row = document.createElement('tr');

    // First item as th
    var th = document.createElement('th');
    th.textContent = consonant_manner[i];
    row.appendChild(th);

    // Remaining items as td
    for (var j = 1; j < columns; j++) {
        var td = document.createElement('td');
        td.textContent = 'Data ' + (i + 2) + '-' + (j + 1);
        row.appendChild(td);
    }

    table.appendChild(row);
    }

    // Append the table to the body
    document.body.appendChild(table);
}
}
// Call the function with the desired number of rows and columns
generateTable(5, 6, "consonant");