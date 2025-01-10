// Home File

const fruitForm = document.querySelector('#input-section form')
const fruitList = document.querySelector('#fruit-section ul')

fruitForm.addEventListener('submit',fruitInput)

function fruitInput(e) {
    e.preventDefault()
    let val = e.target[0].value
    if (!val){
        console.log("Please Enter a Value")
    } else {
        getData(val)
    }
    e.target[0].value = ""
}

function addFruit(fruit) {
    const li = document.createElement('li')
    const ul = document.createElement('ul')
    const liChild = document.createElement('li')
    li.textContent = fruit.name
    liChild.textContent = fruit.family
    fruitList.appendChild(li)
    li.appendChild(ul)
    ul.appendChild(liChild)
}

async function getData(fruit) {
    const url = `https://fruit-api-5v0j.onrender.com/fruits/${fruit}`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("No response from the server" + response.status)
        }
        
        const data = await response.json();
        addFruit(data)
    } catch (error) {
    console.log(error)
    }
}

