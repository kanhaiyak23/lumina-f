import { createSlice } from "@reduxjs/toolkit";
import { errorToast } from "../../utils/toasts";

const initialState = {
    list: [],
};

export const globalDialogs = createSlice({
    name: "globalDialogs",
    initialState,
    reducers: {
        addDialog: (state, action) => {
            if (!state.list.includes(action.payload)) {
                const newListItem = action.payload;
                state.list = [...state.list].map(listItem => {
                    listItem.show = false;
                    return listItem;
                });
                state.list.push(newListItem);
            } else errorToast("Already job is working on this Site");
        },
        hideDialog: (state, action) => {
            state.list = state.list.map(listItem => {
                console.log(listItem.id, action.payload);
                if (listItem.id === action.payload) {
                    listItem.show = false;
                    return listItem;
                } else return listItem;
            });
        },
        openDialog: (state, action) => {
            state.list = state.list.map(listItem => {
                console.log(listItem.id, action.payload);
                if (listItem.id === action.payload) {
                    listItem.show = true;
                    return listItem;
                } else return listItem;
            });
        },
    },
});

export const { addDialog, hideDialog, openDialog } = globalDialogs.actions;

export default globalDialogs.reducer;
