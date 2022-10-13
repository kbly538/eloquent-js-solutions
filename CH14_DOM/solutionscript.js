// https://eloquentjavascript.net/14_dom.html
// Exercises are at the end of the chapter
// 1- Build a table (using dom)
// 2- Elements by tagName (custom getElementByTagName implementation)
// 3- The cat's hat


// 1.
// Build a table
// An HTML table is built with the following tag structure:

// <table>
//   <tr>
//     <th>name</th>
//     <th>height</th>
//     <th>place</th>
//   </tr>
//   <tr>
//     <td>Kilimanjaro</td>
//     <td>5895</td>
//     <td>Tanzania</td>
//   </tr>
// </table>
// For each row, the <table> tag contains a <tr> tag. Inside of these <tr> tags, we can put cell elements: either heading cells (<th>) or regular cells (<td>).

// Given a data set of mountains, an array of objects with name, height, and place properties, generate the DOM structure for a table that enumerates the objects. 
// It should have one column per key and one row per object, plus a header row with <th> elements at the top, listing the column names.
// Write this so that the columns are automatically derived from the objects, by taking the property names of the first object in the data.
// Add the resulting table to the element with an id attribute of "mountains" so that it becomes visible in the document.
// Once you have this working, right-align cells that contain number values by setting their style.textAlign property to "right".


const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];


// Solution

let table = document.createElement('table');
let mountains = document.querySelector('#mountains');
let propertyList = Object.keys(MOUNTAINS[0]);
propertyList.unshift('#'); // Add index column 


// Create header for column names
let tableHeaderRow = document.createElement('tr');
for (let propertyIx = 0; propertyIx < propertyList.length; propertyIx++){
    let tableHeader = document.createElement('th');
    let columnName = document.createTextNode(propertyList[propertyIx]);
    tableHeader.appendChild(columnName);
    tableHeaderRow.appendChild(tableHeader);
}

// Draw table column name row
table.appendChild(tableHeaderRow);    




for (let row = 1; row <= MOUNTAINS.length; row++ )
{
    let newRow = document.createElement('tr'); // Create a table row for each mountain
    for (let col = 0; col < propertyList.length; col++)
    {   
        let newTableData = document.createElement('td'); // Create a table data element for each key
        let data = document.createTextNode(MOUNTAINS[row-1][propertyList[col]]);
        if (col === 0) {
            data = document.createTextNode(row);
        }
        newTableData.appendChild(data); // add textNode to <td> element
        newRow.appendChild(newTableData);  // add <td> to <tr>
    }
    
    //add newly created mountain row(<tr>) to the table
    table.appendChild(newRow);
    
}

// Attach table to the div with id #mountains
mountains.appendChild(table);



// 2.
// Elements by tag name
// The document.getElementsByTagName method returns all child elements with a given tag name. 
// Implement your own version of this as a function that takes a node and a string (the tag name) as arguments and returns an array containing all descendant element nodes with the given tag name.

// Solution
function byTagName(node, tagName) {
    let nodeList = node.childNodes;
    if (!node || !node.childNodes) return;
    let result = [];


    nodeList.forEach(nextNode => {
        let targetTagName = nextNode.nodeName.toLowerCase();
        if (targetTagName === tagName) {
            result.push(targetTagName);
        } else {
            result = result.concat(byTagName(nextNode, tagName))

        }
    })
    return result
}

// Modified original node arguments to include solutions in a shared index page.
console.log(byTagName(document.getElementById('ex-2'), "h1").length);
// → 1
console.log(byTagName(document.getElementById('ex-2'), "span").length);
// → 3
let para = document.querySelector("p");
console.log(byTagName(para, "span").length);
// → 2



// 3. THe cat's hat
// Extend the cat animation defined earlier so that both the cat and his hat (<img src="img/hat.png">) orbit at opposite sides of the ellipse.
// Or make the hat circle around the cat. Or alter the animation in some other interesting way.

let cat = document.querySelector("#cat");
let hat = document.querySelector("#hat");

let angle = 0;
let lastTime = null;
function animate(time) {
  if (lastTime != null) angle += (time - lastTime) * 0.001;
  lastTime = time;
  cat.style.top = (Math.sin(angle) * 40 + 40) + "px";
  cat.style.left = (Math.cos(angle) * 200 + 230) + "px";

//   hat.style.top = (Math.sin(angle) * -40 + 40) + "px";
//   hat.style.left = (Math.cos(angle) * -200 + 230) + "px";

let x_val = (Math.cos(angle) * 300 + 300)
let y_val = (Math.sin(angle) * 100 + 100);

    hat.style.top = y_val + 'px';
    hat.style.left = x_val + 'px';
    console.log(y_val);
    if (x_val < 200 && y_val < 100){
        hat.style.zIndex = -3;
        console.log(hat.style.top)
    } else if (x_val < 200 && y_val > 100){
        hat.style.zIndex = 3;
        hat.style.transition = "z-index 1s";
    }

    hat.style.top += 'px';


  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
