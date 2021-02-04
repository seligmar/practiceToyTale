let addToy = false

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyFormContainer = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = 'block'
    } else {
      toyFormContainer.style.display = 'none'
    }
  })
  getToys()
})

function getToys () {
  let url = 'http://localhost:3000/toys'
  //return
  fetch(url)
    .then(resp => resp.json())
    .then(resp => buildToyList(resp))
}

function buildToyList (toys) {
  console.log()
  toys.forEach(toy => buildToyCards(toy))
}

function buildToyCards (toy) {
  var containerDiv = document.createElement('div')
  containerDiv.classList.add('card')
  var toyNameH2 = document.createElement('h2')
  var toyImg = document.createElement('img')
  toyImg.classList.add('toy-avatar')
  var likesP = document.createElement('p')
  likesP.innerHTML = toy.likes + ' Likes'
  var likesBtn = document.createElement('button')
  containerDiv.append(toyNameH2)
  containerDiv.append(toyImg)
  containerDiv.append(likesP)
  containerDiv.append(likesBtn)
  document.body.append(containerDiv)
}
