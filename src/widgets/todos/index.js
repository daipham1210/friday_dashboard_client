import React from "react";
class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.todoListRef = React.createRef(); 
    this.state = { 
      newTodo: '',
      todos: [
        { id: 0, title: 'abc abc abc abc abc abc', isChecked: false },
        { id: 1, title: 'abc', isChecked: false },
        { id: 2, title: 'abc', isChecked: false },
        { id: 3, title: 'abc', isChecked: false },
        { id: 4, title: 'abc', isChecked: false }
      ]
    };
  }
  onAddToDo = e => {
    if (e.charCode === 13) {
      let todos = this.state.todos;
      let id = 0;
      if(todos && todos.length >= 1) {
        id = todos.reduce((max, todo) => (todo.id > max ? todo.id : max), todos[0].id) + 1;
      }
      const todo = { id: id, title: e.target.value, isChecked: false };
      todos.push(todo);
      this.setState({ todos }, () => {
        this.todoListRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      });
    }
  }
  onCheckToDo = (e, id) => {
    e.stopPropagation();
    this.setState(prevState => ({
      todos: prevState.todos.map(obj => (
        obj.id === id ? Object.assign(obj, { isChecked: !obj.isChecked }) : obj)
      )
    }));
  }
  onRemoveTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(obj => obj.id !== id)
    }));
  }
  render() {
    return(
      <div className="todos">
        <div>
          <input className="new-todo" onKeyPress={this.onAddToDo} 
                 placeholder="What needs to be done?"/>
        </div>
        <div className="todoWraper">
        <ul className="todo-list" ref={this.todoListRef}>
          { 
            this.state.todos.map(todo => {
              return(
              <li className={todo.isChecked ? 'selected': ''} key={todo.id}>
                <div className='view'>
                  <input className="toggle" type="checkbox" onClick={(e) => this.onCheckToDo(e, todo.id)}></input>
                  <label>{todo.title}</label>
                  <button className="destroy" onClick={()=> this.onRemoveTodo(todo.id)}></button>
                </div>
              </li>)
            })
          }
        </ul>
        </div>
        <div className="footer">
          <span className='todo-count'>1 item left</span>
          <div className='filter'>
            <span className='selected'>All</span>
            <span>Active</span>
            <span>Completed</span>
          </div>
          <span>Clear completed</span>
        </div>
      </div>
    )
  }
}
export default Todos;