const fruitForm = document.querySelector('#input-section form')
const fruitList = document.querySelector('#fruit-section ul')
const fruitPara = document.querySelector('#fruit-section h3')


let counter = 0 

fruitForm.addEventListener('submit',fruitInput)
document.addEventListener('DOMContentLoaded',countFruits())


function fruitInput(e) {
    e.preventDefault()
    let val = e.target[0].value
    if (!val) {
        alert("Please Enter a Value")
    } else if (val == 'clear') {
        addFruit('clear')
    } else if (!val.match(/[a-z]/i)) {
        alert("Characters only no punctuation")
    } else if (val.match(/s$/)) {
        let slicedVal = val.slice(0,(val.length-1))
        getData(slicedVal)
    } else {
        getData(val)
    }
    e.target[0].value = ""
}

function addFruit(fruit) {
    if (fruit == 'clear'){
        try {
            const fruitItems = document.querySelector('#fruit-section ul li')
            if (!fruitItems) {
                throw new Error(alert("There are no line items"))
            }
            fruitItems.remove()
        } catch (error) {
            console.log(error)
        }
    } else {
        counter++
        countFruits()

        const li = document.createElement('li')
        li.className = 'item'

        const ul = document.createElement('ul')
        const liChild = document.createElement('li')

        li.addEventListener('click',(e)=>{
            e.target.remove()
            counter--
            countFruits()
        })

        li.textContent = fruit.name
        liChild.textContent = fruit.family 
        
        fruitList.appendChild(li)
        li.appendChild(ul)
        ul.appendChild(liChild)
    }
}

async function getData(fruit) {
    // First Line is the Url 
    const url = `https://fruit-api-5v0j.onrender.com/fruits/${fruit}`
    // Then we enter the Async part of the function
    try {
        // This line awaits the response of the url 
        const response = await fetch(url);
        // If response is invalid we throw an error with res status of 404
        if (!response.ok) {
            throw new Error(alert("No response from the server (not a fruit in the database) status code: " + response.status))
        }
        // Else we recieve the data via an JSON object and parse as Javascript and use await
        const data = await response.json();
        addFruit(data)
    // We have a catch statement here to catch any errors stemming from this function.
    } catch (error) {
    console.log(error)
    }
}

function countFruits(){
    fruitPara.textContent = "Number of Fruits Added: " + counter
}