import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
export interface TodoType {
    id: number;
    title: string;
    completed: boolean;
}

const initialState: TodoType[] = [
    {
      id: 1,
      title: "todo1",
      completed: false
    },
    {
      id: 2,
      title: "todo2",
      completed: false
    },
  ]

  const todoSlice =  createSlice({
    name: 'todo',
    initialState,
    reducers: {
        changeStatus : (state, action: PayloadAction<number>) => {
            return state.map((todo) => {
                if(todo.id === action.payload) {
                 return {...todo, completed: ! todo.completed};
                }
                else return todo;
             })
        },
        deleteTodo : (state, action: PayloadAction<number>) =>
        { 
            return state.filter(item => item.id !== action.payload )

        },
        addNewTodo : (state: TodoType[] , action: PayloadAction<string>) => {
          

            return [...state,{id: state[state.length -1 ].id + 1, title: action.payload, completed: false}];
    },
   
    },
    extraReducers(builder) {
     builder.addCase(
        setTodoAsync.pending,
        () => {
            console.log("state is pending");
        }
     )
     .addCase(
        setTodoAsync.fulfilled,
        ( state , action: PayloadAction<AxiosResponse<any,any>>) => {
         return action.payload.data;
        }
     )
    },
  })
  export const setTodoAsync = createAsyncThunk(
    "todo/setTodoAsync",
    async(url: string )=> {
        const getToDo = await axios.get(url);
        return getToDo;
    });
export const { changeStatus, deleteTodo, addNewTodo }  = todoSlice.actions;
  export default todoSlice.reducer;