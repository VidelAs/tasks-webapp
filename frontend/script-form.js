let task_count = 0; //Variable global para el contador de tareas
window.onload = function () {
  //Funcion que se ejecuta al cargarse la pagina
  getTaskList();
  getUserName();
};

//Funcion que llama el api para agregar una nueva tarea
async function addTasks(title, description, userid, start_date, final_date) {
  task_count += 1;
  if (start_date != null) {
    //valida si se seleciono una fecha de inicio, sino es asi se setea en null la variable
    start_date = "'" + start_date + "'";
  }
  if (final_date != null) {
    //valida si se seleciono una fecha de fin, sino es asi se setea en null la variable
    final_date = "'" + final_date + "'";
  }
  let task = {
    //Objecto que se envia en el api para crear una nueva tarea
    task_id: task_count,
    title: title,
    start_date: start_date,
    due_date: final_date,
    status: 1,
    priority: 1,
    description: description,
    created_at: null,
    user: userid,
  };
  let res = await axios.post("http://localhost:4000/api/tasks/new-task", task); //Llamada al API con el metodo POST
  console.log(res.data);
}

//Funcion para obtener el user_first_name, user_last_name y user_id
async function getUserName() {
  const config = {
    //Configuracion que se envia en el llamado de la API
    method: "get",
    url: "http://localhost:4000/api/users/get-names",
  };

  let res = await axios(config); //Llamada de la API
  let users = res.data.results; //El resultado de la llamada se almacena en la variable

  let select = document.getElementById("created"); //Se seleciona el select creado en el HTML
  let option = document.createElement("option"); //Se crea un elemento de tipo option y se almacena en la variable option
  option.text = ""; //Se incializa el texto para el primer option
  option.value = 0; //Se incializa el value para el primer option
  select.add(option); //Se carga el primer option dentro del select
  for (let i = 0; i < users.length; i++) {
    //Se recorre el json devuelto en la llamada del API
    let option = document.createElement("option"); //Se crea un nuevo elemento de tipo option
    option.text = users[i].user_first_name + " " + users[i].user_last_name; //Se le asigna la concatenacion del first name y last name dentro del text del option
    option.value = users[i].user_id; //Se le asigna el user id dentro del value del option
    select.add(option); //Se carga el nuevo option dentro del select
  }
}

//Funcion para obtener las tareas almacenadas
async function getTaskList() {
  const config = {
    //Configuracion que se envia en el llamado de la API
    method: "get",
    url: "http://localhost:4000/api/tasks",
  };

  let res = await axios(config); //Llamada del API
  let tasks = res.data.results; //El resultado de la llamada de la API se almacena en la variable tasks
  task_count = tasks.length; //La cantidad de registros devueltos se alamacena en la variable global task_count
  let table = document.getElementById("tasks"); //Se seleciona el elemento table creado en el HTML
  let row = table.insertRow(0); //Se le crea una nueva fila
  let cell1 = row.insertCell(0); //Se crea la primer celda
  let cell2 = row.insertCell(1); //Se crea la segunda celda
  cell1.innerHTML = "Titulo"; //Se le agrega el valor a la primer celda
  cell2.innerHTML = "Descripcion"; //Se le agrega el valor a la segunda celda
  for (let i = 0; i < tasks.length; i++) {
    //Se recorre el json devuelto en la llamada de la API
    let row = table.insertRow(i + 1); //Se le crea una nueva fila
    let cell1 = row.insertCell(0); //Se crea la primer celda
    let cell2 = row.insertCell(1); //Se crea la segunda celda
    cell1.innerHTML = tasks[i].title; //Se le agrega el valor a la primer celda extraido desde el JSON
    cell2.innerHTML = tasks[i].description; //Se le agrega el valor a la segunda celda extraido desde el JSON
  }
}

//dom
// Info date
//Creo que esto ya no  hace falta
const dateNumber = document.getElementById("dateNumber");
const dateText = document.getElementById("dateText");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");
let tbody = "";
let t_body = document.getElementById("tbody");

// Tasks Container
const tasksContainer = document.getElementById("tasksContainer");

const setDate = () => {
  const date = new Date();
  dateNumber.textContent = date.toLocaleString("en", { day: "numeric" });
  dateText.textContent = date.toLocaleString("en", { weekday: "long" });
  dateMonth.textContent = date.toLocaleString("en", { month: "short" });
  dateYear.textContent = date.toLocaleString("en", { year: "numeric" });
};

const addNewTask = (event) => {
  event.preventDefault();
  let title = event.target.title.value;
  let des = event.target.description.value;
  let priority = event.target.color.value;
  //const sel = event.target.select.value;
  const select = document.getElementById("created");
  const sel = select.value;
  if (!title) return;
  if (!des) return;
  if (!priority) return;
  if (!sel) return;

  let table = document.getElementById("tasks");
  let row_count = table.rows.length;
  let row = table.insertRow(row_count);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = title;
  cell2.innerHTML = des;
  let start_date = document.getElementById("start_date"); //Se seleciona el elemento del primer input date
  let start_value = start_date.value; //Se alamacena su value dentro de la variable
  let final_date = document.getElementById("final_date"); //Se seleciona el elemento del segundo input date
  let final_value = final_date.value; //Se alamacena su value dentro de la variable
  if (!start_value) {
    //Se evalua si se seleciono alguna fecha en el primer input date, sino es asi se le da un valor de null a la variable
    start_value = null;
  }
  if (!final_value) {
    //Se evalua si se seleciono alguna fecha en el segundo input date, sino es asi se le da un valor de null a la variable
    final_value = null;
  }
  addTasks(title, des, sel, start_value, final_value); //Se hace e llamado a la funcion para agregar una tarea

  //Esto creo que se se puede quitar
  const task = document.createElement("form");
  task.classList.add("task", "roundBorder");
  task.addEventListener("click", changeTaskState);
  task.tbody = tbody;
  //tbody.prepend(task);
  event.target.reset();
};

const changeTaskState = (event) => {
  event.target.classList.toggle("done");
};

const order = () => {
  const done = [];
  const toDo = [];
  tasksContainer.childNodes.forEach((el) => {
    el.classList.contains("done") ? done.push(el) : toDo.push(el);
  });
  return [...toDo, ...done];
};

const renderOrderedTasks = () => {
  order().forEach((el) => tasksContainer.appendChild(el));
};

setDate();
