const ADD_TEXT = 'ADD_TEXT';

addText = () => {
    return {
            type: ADD_TEXT,
            payload: "Action ADD TEXT"
        }
}

export {addText};