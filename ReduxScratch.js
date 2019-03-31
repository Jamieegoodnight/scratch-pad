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
    case DELETE_EXAMPLE:
    return {
        ...state,
        todos: state.todos.filter(x => !x.completed)
    }
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
    case TOGGLE_ALT_EXAMPLE:
    return {
        ...state,
        todos: state.todos.map(x => 
            index===action.payload ? {...x, completed: !x.completed} : x
        )
    }
    default:
    return state
}


