import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseId: null
}

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers:{
        addCourse: (state, action) => {
            
        }
    }
})