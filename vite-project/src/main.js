
const apiURL = "http://localhost:3000/tareas"

const form = document.getElementById("formData")
const list = document.getElementById('tasks')
const listcomp = document.getElementById('tasksComp')
const listpend = document.getElementById('tasksPend')
const input= document.getElementById('date')


async function getData(){
try{
  const response = await fetch(apiURL)
  const data = await response.json()
   completos = data.filter(data=> data.completada == true)
   pendiente = data.filter(data=> data.completada == false)
  console.log(data)
  console.log(completos)
  console.log(pendiente)
   listcomp.innerHTML=""
   list.innerHTML=""
   listpend.innerHTML=""
   input.value =""
   
     
    data.forEach((d)=>{
      const li = document.createElement("li")
      console.log(d)
      li.innerHTML = `<button onclick="deleteData(${d.id})" >🗑️</button><input type="checkbox" id="check" ${d.completada? 'checked': ''} onchange="toggleEstado(${d.id}, this.checked)"><span style="text-decoration:${d.completada? 'line-through': 'none'}; ">${d.titulo}</span> `
      tasks.appendChild(li)
     
     
    })

     completos.forEach((c)=>{
      const li = document.createElement("li")
      li.innerHTML = `<button onclick="deleteData(${c.id})">🗑️</button><input type="checkbox" id="check" ${c.completada? 'checked': ''} onchange="toggleEstado(${c.id}, this.checked)"><span style="text-decoration:${c.completada? 'line-through': 'none'};">${c.titulo}</span>`
      listcomp.appendChild(li)
    
     
    })
        pendiente.forEach((p)=>{
      const li = document.createElement("li")
      li.innerHTML = `<button onclick="deleteData(${p.id} )" >🗑️</button><input type="checkbox" id="check" ${p.completada? 'checked': ''} onchange="toggleEstado(${p.id}, this.checked)"><span style="text-decoration:${p.completada? 'line-through': 'none'};">${p.titulo}</span>`
      listpend.appendChild(li)
      
     
    })
    
    

    
    
  }
catch(error){
  console.error(error)
}
}

form.addEventListener("submit",async(e)=>{

  e.preventDefault()
  try{
    const newObject = {
      id:String( Date.now()),
      titulo: input.value,
      completada:false
      
    }
  
  
    fetch(apiURL,{
      method: "POST",
      headers:{
        "Content-Type":"aplication/json"
      },
      body: JSON.stringify(newObject)
    })
    getData()
      
    
  }catch{}
})

async function toggleEstado(id, estado){

  try{
    const response = await fetch(`${apiURL}/${id}`,{
      method: 'PATCH',
      headers:{
        'Content-Type': 'applications/json'
      },
      body: JSON.stringify({completada: estado})
    })

  }
  catch(error){
    console.error(error)


  }
  getData()
}


async function deleteData(id){

  try{
     const response = await fetch(`${apiURL}/${id}`,{
    method: 'DELETE',
      headers:{
        'Content-Type': 'applications/json'
      }
    })

  }catch(error){
    console.error("qww",error)
  }
getData()
}

     
      
