addExample = e => {
    e.preventDefault();
    this.props.myExamples(this.state.exampleText);
}


switch (action.type){
    case ADD_EXAMPLE: 
    return {
        ...state,
        todos: [...state.todos, action.payload]
    }
    case TOGGLE_EXAMPLE:
    return {
        ...state,
        todos: state.todos.map(x => {
            if (index===action.payload){
                return {...x, completed: !x.completed}
            } else {
                return x
            }
        })
    }
}

