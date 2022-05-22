// i put the todo in the input
// then i hit the submit button and the item gets added to the ul
//when i click the item in the ul it gets crossed out
//then it updates the number of todos i have to do
// then i click the button that say clear list to erase all todos
// or i clear 


let starButton =document.querySelectorAll('.star')
let resetButton = document.querySelector('#endAll')

resetButton.addEventListener("click",()=>{
document.querySelectorAll('li').forEach(task =>{
    task.remove()
})
})

let trash = document.querySelectorAll('.deleteOne')
trash.forEach(function(element) {
    element.addEventListener('click', function(){
      const task = this.parentNode.childNodes[1].innerText
      
      fetch('messages', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'task': task
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});

starButton.forEach(function(element) {
    element.addEventListener('click', function(){
        const listBackground = this.parentNode
      const task = listBackground.childNodes[1].innerText
      const star = listBackground.childNodes[3]
      const eraser = listBackground.childNodes[5]
      fetch('addPriority', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'task': task,
            'isPriority':true
        })
      }).then (response => {
          if(response.ok) return response.json()
        window.location.reload()
      })
      .then(data =>{
          listBackground.style.background= 'rgb(46, 24, 0)'
          listBackground.style.color = 'white'
          star.style.color = 'white'
          eraser.style.color= 'white'
          console.log('data',data)
      })
    });
});