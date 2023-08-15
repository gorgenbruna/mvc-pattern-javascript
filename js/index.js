class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback
  }

  _commit(todos) {
    this.onTodoListChanged(todos)
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length -1].id + 1 : 1,
      text: todoText,
      complete: false,
    }
    this.todos.push(todo)

    this._commit(this.todos)
  }

  // Mapeando todos os todos e substituindo o texto do todo pelo id especificado
  editTodo(id, updatedText) {
    this.todos = this.todos.map(todo => 
      todo.id === id ? {id: todo.id, text: updatedText, complete: todo.complete} : todo,
    )

    this._commit(this.todos)

  }

  // Filtrando um todo fora do array por id
  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id)

    this._commit(this.todos)
  }

  // Invertendo o booleano completo no todo especificado
  toggleTodo(id) {
    this.todos = this.todos.map(todo =>
    this.id === id ? {id: todo.id, text: todo.text, complete: !todo.complete} : todo,
  )
  this._commit(this.todos)
  }
}

class View {
  constructor() {
    // Elemento root
    this.app = this.getElement('#root')

    // Titulo do app
    this.title = this.createElement('h1')
    this.title.textContent = 'Todos'

    // O formulário, com um [type='text'] input, e botão de submit
    this.form = this.createElement('form')

    this.input = this.createElement('input')
    this.input.type = 'text'
    this.input.placeholder = 'Add todo'
    this.input.name = 'todo'

    this.submitButton = this.createElement('button')
    this.submitButton.textContent = 'Submit'

    // Representação visual da lista de tarefas
    this.todoList = this.createElement('ul', 'todo-list')

    // Anexa o botão de entrada e envio ao formulário
    this.form.append(this.input, this.submitButton)

    // Anexa o título, formulário e lista de tarefas ao aplicativo
    this.app.append(this.title, this.form, this.todoList)

    this._temporaryTodoText = ''
    this._initLocalListeners()
  }

  get _todoText() {
    return this.input.value
  }

  _resetInput() {
    this.input.value = ''
  }

    // Criando um elemento com uma classe CSS opcional
    createElement(tag, className) {
      const element = document.createElement(tag)
      if(className) element.classList.add(className)
  
      return element
    }
  
    // Recupera um elemento do DOM
    getElement(selector) {
      const element = document.querySelector(selector)
  
      return element
    }

  displayTodos(todos) {
    // Excluir todos os nós
    while(this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild)
    }

    // Mostrar mensagem padrão
    if(todos.length === 0) {
      const p = this.createElement('p')
      p.textContent = 'Nothing to do! Add a task?'
      this.todoList.append(p)
    } else {
      // Cria nós de itens de tarefas para cada tarefa no estado
      todos.forEach(todo => {
        const li = this.createElement('li')
        li.id = todo.id

        // Cada item de tarefa terá uma caixa de seleção que você pode alternar
        const checkbox = this.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = todo.complete

        // O texto do item de tarefa ficará em um espaço editável pelo conteúdo
        const span = this.createElement('span')
        span.contentEditable = true
        span.classList.add('editable')

        // Se o todo estiver completo, terá um tachado
        if(todo.complete) {
          const strike = this.createElement('s')
          strike.textContent = todo.text
          span.append(strike)
        // Caso contrário, apenas exiba o texto
        } else {
          span.textContent = todo.text
        }

        // Os todos também terão um botão delete
        const deleteButton = this.createElement('button', 'delete')
        deleteButton.textContent = 'Delete'
        li.append(checkbox, span, deleteButton)

        // Acrescenta nós à lista de tarefas
        this.todoList.append(li)
      });
    }
  }

  _initLocalListeners() {
    this.todoList.addEventListener('input', event => {
      if(event.target.className === 'editable') {
        this._temporaryTodoText = event.target.innetText
      }
    })
  }

  bindAddTodo(handler) {
    this.form.addEventListener('submit', event => {
      event.preventDefault()

      if(this._todoText) {
        handler(this._todoText)
        this._resetInput()
      }
    })
  }

  bindDeleteTodo(handler) {
    this.todoList.addEventListener('click', event => {
      if(event.target.className === 'delete') {
        const id = parseInt(event.target.parentElement.id)

        handler(id)
      }
    })
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener('change', event => {
      if(event.target.type === 'checkbox') {
        const id = parseInt(event.target.parentElement.id)

        handler(id)
      }
    })
  }


  bindEditTodo(handler) {
    this.todoList.addEventListener('focusout', event => {
      if(this._temporaryTodoText) {
        const id = parseInt(event.target.parentElement.id)

        handler(id, this._temporaryTodoText)
        this._temporaryTodoText = ''
      }
    })
  }
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.model.bindTodoListChanged(this.onTodoListChanged)
    this.view.bindAddTodo(this.handleAddTodo)
    this.view.bindDeleteTodo(this.handleDeleteTodo)
    this.view.bindToggleTodo(this.handleToggleTodo)
    this.view.bindEditTodo(this.handleEditTodo)

    // Exibe todos iniciais
    this.onTodoListChanged(this.model.todos)
  }

  onTodoListChanged = todos => {
    this.view.displayTodos(todos)
  }

  handleAddTodo = todoText => {
    this.model.addTodo(todoText)
  }

  handleEditTodo = (id, todoText) => {
    this.model.editTodo(id, todoText)
  }

  handleDeleteTodo = id => {
    this.model.deleteTodo(id)
  }

  handleToggTodo = id => {
    this.model.toggleTodo(id)
  }

}

const app = new Controller(new Model(), new View())