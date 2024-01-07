/*
23 letters
1 2 3 4 5 6 7 8 9 a b c d e f g h i j k l m n
*/
import imports from './JSON/imports.json' assert {type: 'json'};
const texts = imports;

const letterMap = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"]
const scriptMap = ["lat", "cyr", "ipa"];


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

const consonant_map = new Map([
    [11, letter["1"]],
    [12, letter["7"]],
    [13, letter["e"]],
    [14, letter["g"]],
    [21, letter["4"]],
    [22, letter["3"]],
    [23, letter["8"]],
    [24, letter["9"]],
    [26, letter["i"]],
    [27, letter["h"]],
    [28, letter["j"]],
    [31, letter["2"]],
    [32, letter["6"]],
    [33, letter["m"]],
    [35, letter["n"]],
    [42, letter["5"]],
]);
const consonant_map_IPA = new Map();
const consonant_map_lat = new Map();
const consonant_map_cyr = new Map();
consonant_map.forEach((value, key) => {
    consonant_map_IPA.set(key, value["ipa"]);
    consonant_map_lat.set(key, value["lat"]);
    consonant_map_cyr.set(key, value["cyr"]);
});

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
            if (i == 1 || i == 2 || i == 4) {
                th.colSpan = 2;
            }
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);

        for (var i = 1; i < rows; i++) {
        var row = document.createElement('tr');

        // First item as th
        var th = document.createElement('th');
        th.textContent = consonant_manner[i - 1];
        row.appendChild(th);
        // Remaining items as td

        if (i !=2  && i != 3) {
            for (var j = 1; j < columns; j++) {
            var td = document.createElement('td'); 
            if (consonant_map_IPA.get((i)*10+(j)) != undefined) {
                td.innerHTML = '&langle;' + '&rangle;  ' + '[' + consonant_map_IPA.get((i)*10+(j)) + ']';
            }
            if (j == 1 || j == 2 || j == 4) {
                td.colSpan = 2;
            }
            row.appendChild(td);
            }
            table.appendChild(row);
        } else if (i == 2) {
            for (var j = 1; j < columns + 3; j++) {
                var td = document.createElement('td');
                if (consonant_map_IPA.get((i)*10+(j)) != undefined) {
                    td.innerHTML = '[' + consonant_map_IPA.get((i)*10+(j)) + ']';
                }
                row.appendChild(td);
                }
                table.appendChild(row);
        } else {
            for (var j = 1; j < columns + 1; j++) {
                var td = document.createElement('td');
                if (consonant_map_IPA.get((i)*10+(j)) != undefined) {
                    td.innerHTML = '[' + consonant_map_IPA.get((i)*10+(j)) + ']';
                }
                if (j == 1 || j == 5) {
                    td.colSpan = 2;
                }
                row.appendChild(td);
                }
                table.appendChild(row);
            }
        }
        // Append the table to the body
        document.body.appendChild(table);
    }
}

// Call the function with the desired number of rows and columns
generateTable(5, 6, "consonant");