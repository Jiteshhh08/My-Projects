const input = document.getElementById('input')
const Add_btn = document.getElementById('Add_btn')
const List = document.getElementById('Todo_list')

//Try to load saved todos from the localStorage (if any)
const Saved = localStorage.getItem('todos');
const todos = Saved? JSON.parse(Saved) : [];


function SaveTodos(){
    //Save Todos
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Create a dom node for a todo Object and append it to the list

function CreateTodoNode(todo, index){
    const li = document.createElement('li')

    //Checkbox to toggle completion
    const Checkbox = document.createElement('input')
    Checkbox.type = 'checkbox'
    Checkbox.checked = !!todo.Completed
    Checkbox.addEventListener('change', () => {
        todo.Completed = Checkbox.checked

        TextSpan.style.textDecoration = todo.Completed?'line-through': '';

    SaveTodos();
    })
    //Text of the todo
    const TextSpan = document.createElement('span')
    TextSpan.textContent = todo.text
    TextSpan.style.margin = '0 8px';
    if(todo.Completed){
        TextSpan.style.textDecoration = 'line-through'
    }
        //add Double click event listner to edit
        TextSpan.addEventListener('dblclick', () => {
            const newText = prompt("Edit Text", todo.text);
            if(newText !== null){
                todo.text = newText.trim();
                TextSpan.textContent = todo.text;
                SaveTodos();
            }Ś
        })
        //Del Button

        const Delbtn = document.createElement('button')
        Delbtn.textContent = 'DELETE'
        Delbtn.addEventListener('click', () => {
            todos.splice(index, 1)
            render();
            SaveTodos();
        })

        li.appendChild(Checkbox)
        li.appendChild(TextSpan)
        li.appendChild(Delbtn)
        return li;
    
}

//Render the whole todo list from the todo array
function render(){
    List.innerHTML = ''

    //Recreate each item
    todos.forEach((todo, index) => {
        const node = CreateTodoNode(todo,index)
        List.appendChild(node)
    });

}

function AddTodo(){
    const text = input.value.trim()
    if(!text){
        return
    }

    //push a new todo object
    todos.push({text, Completed: false})
    input.value = '';
    render();
    SaveTodos();
}

Add_btn.addEventListener('click', AddTodo);
render();

