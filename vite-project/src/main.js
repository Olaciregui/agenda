
const apiURL = "http://localhost:3000/tareas"

const form = document.getElementById("formData")
const list = document.getElementById('tasks')
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
   tasks.innerHTML=""
   
     
    data.forEach((d)=>{
      const li = document.createElement("li")
      li.innerHTML = `<input type="checkbox" id="check" ${d.completada? 'checked': ''} onchange="toggleEstado(${d.id}, this.checked)"><span style="text-decoration:${d.completada? 'line-through': 'none'};">${d.titulo}`
      tasks.appendChild(li)
     
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


     
      
