// https://eloquentjavascript.net/15_event.html
// Exercises are at the end of the chapter
// 1- Baloon
// 2- Mouse Trail
// 3- Tabs


// 1.
// Baloon
// Write a page that displays a balloon (using the balloon emoji, 🎈). 
// When you press the up arrow, it should inflate (grow) 10 percent, and when you press the down arrow, it should deflate (shrink) 10 percent.
// When that works, add a feature where, if you blow up the balloon past a certain size, it explodes. 
// In this case, exploding means that it is replaced with an 💥 emoji, and the event handler is removed (so that you can’t inflate or deflate the explosion).

let baloon = document.querySelector("#baloon");
let size = 16;


function changeBaloonSize(e) {

    if (e.key === "ArrowUp") {
        size += size * .1;
        size > 400 ? explode() : null;
    }
    if (e.key === "ArrowDown" && size >= 16) {
        size -= size * 0.1;
    }

    baloon.style.fontSize = size + "px";
}


function explode() {
    baloon.textContent = "💥";
    window.removeEventListener('keydown', changeBaloonSize)
}


window.addEventListener('keydown', changeBaloonSize);





// 2.
// Mouse Trail
// I want you to implement a mouse trail. 
// Use absolutely positioned <div> elements with a fixed size and background color (refer to the code in the “Mouse Clicks” section for an example). 
// Create a bunch of such elements and, when the mouse moves, display them in the wake of the mouse pointer.


const trail = []
counter = 0;

let mouseX = 0;
let mouseY = 0;

function createTrailNode() {
    const trailNode = document.createElement("div");
    trailNode.classList.add('trail');
    return trailNode;
}

function createTrailNodes() {

    for (let index = 0; index < 100; index++) {
        trail[index] = createTrailNode();
        document.body.appendChild(trail[index]);
    }
}


function drawTrail(e) {
    mouseX = e.clientX;
    moustY = e.clientY
    counter++;
    let targetIndex = counter % trail.length;
    const targetNode = trail[targetIndex];
    targetNode.style.transition = "top .4s, left .8s"  // swarmy


    targetNode.style.top = `${e.clientY}px`;
    targetNode.style.left = `${e.clientX}px`;

}






createTrailNodes()
document.addEventListener('mousemove', drawTrail);



// 3.
// Tabs
// In this exercise you must implement a simple tabbed interface. Write a function, asTabs, that takes a DOM node and creates a tabbed interface showing the child elements of that node. 
// It should insert a list of <button> elements at the top of the node, one for each child element, containing text retrieved from the data-tabname attribute of the child. 
// All but one of the original children should be hidden (given a display style of none). The currently visible node can be selected by clicking the buttons.



function asTabs(node) {
    const tabs = [];
    node.childNodes.forEach(element => {
        if (element.nodeName.toLowerCase() !== '#text') {
            tabs.push(element);
        }
    });

    for (const tab of tabs) {
        
        //create a parent for tabs
        let parent = document.createElement('div');
        parent.classList.add(tab.dataset.tabname);

        //create a child to be replaced
        let tempChild = document.createElement('div');

        //create a button
        const button = document.createElement('button');
        button.textContent = tab.dataset.tabname;

        // prepare parent node
        parent.appendChild(button)
        parent.appendChild(tempChild);
        parent.replaceChild(tab, tempChild);


        // finalize the node passed as an argument to the function
        node.appendChild(parent);

        // initially hide all text content
        tab.style.display = "none"


        button.addEventListener('click', e => {
            for (let i of tabs) {

                // alter css of the target and other buttons
                if (i.dataset.tabname === e.target.innerText) {
                    if (i.style.display === "block") {
                        i.style.display = "none";
                        e.target.style.backgroundColor = "white"
                    } else {
                        i.style.display = "block"
                        e.target.style.backgroundColor = "yellow";
                    }
                } else {
                    i.style.display = "none"
                    let thisButton = i.parentNode.querySelector('button')
                    thisButton.style.backgroundColor = "white";
                }

            }
        })

        
    }

}




asTabs(document.querySelector("tab-panel"));