let addToy = false
const addBtn = document.querySelector('#new-toy-btn')
const toyFormContainer = document.querySelector('.container')
var addToyButton = document.querySelector('#create-toy-button')
addToyButton.addEventListener('click', checkInputs)

document.addEventListener('DOMContentLoaded', () => {
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
  containerDiv.id = toy.id
  var toyNameH2 = document.createElement('h2')
  toyNameH2.innerHTML = toy.name
  var toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.classList.add('toy-avatar')
  var likesP = document.createElement('p')
  likesP.id = 'likesP' + toy.id
  likesP.innerHTML = toy.likes + ' Likes'
  var likesBtn = document.createElement('button')
  likesBtn.classList.add('like-btn')
  likesBtn.innerHTML = 'Like <3'
  likesBtn.id = toy.id
  likesBtn.addEventListener('click', addLike)
  containerDiv.append(toyNameH2)
  containerDiv.append(toyImg)
  containerDiv.append(likesP)
  containerDiv.append(likesBtn)
  document.body.append(containerDiv)
}

function addLike () {
  var likeCount = document.querySelector('#' + 'likesP' + this.id)
  var likesCount =
    parseInt(likeCount.innerHTML.substr(0, likeCount.innerHTML.indexOf(' '))) +
    1
  var url = 'http://localhost:3000/toys/' + this.id
  fetch(url, {
    method: 'PATCH',
    body: JSON.stringify({
      likes: likesCount
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    referrer: 'no-referrer'
  }).then(updateDom(likeCount, likesCount))
}

function updateDom (element, likesCount) {
  element.innerHTML = likesCount + ' Likes'
}

function checkInputs () {
  var newName = document.querySelector('#newName').value
  var newImg = document.querySelector('#newImg').value
  if (newName.length < 1 || newImg.length < 1) {
    window.alert('please complete the form')
  } else createNewToy(newName, newImg)
}

function createNewToy (newName, newImg) {
  var newToy = {}
  newToy.name = newName
  newToy.image = newImg
  newToy.likes = 0
  postNewToy(newToy)
}

function postNewToy (toy) {
  var url = 'http://localhost:3000/toys/'
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      name: toy.name,
      image: toy.image,
      likes: toy.likes
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    referrer: 'no-referrer'
  }).then(buildToyCards(toy))
}
