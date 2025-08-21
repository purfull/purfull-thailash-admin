import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { retry } from "@reduxjs/toolkit/query";
import { act } from "react";


export const dashboardReport = createAsyncThunk("dashboard-Report", async ({ startDate, endDate, type, online }) => {

    const responce = await fetch(`https://api.thailash.com/order/reports?startDate=${editData.startDate
        }
        &endDate=${editData.endDate}&type=${type ? "B2B" : "B2C"}&isOnline=${online}`, {
        method: "GET"
    });
    const data = responce.json();
    return data
})



const DashboardReportSlice = createSlice({

    initialState: {
        isloading: false,
        message: null,
        dashboradReportData: [],
    },

    name: "dashboard",
    reducers: {
        add: (state, action) => {
            state.product = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(dashboardReport.fulfilled, (state, action) => {
            state.dashboradReportData = action.payload
            state.isloading = false
        })
        builder.addCase(dashboardReport.pending, (state, action) => {
            state.isloading = true,
                state.message = "your report slice is pending stage "
        })
        builder.addCase(dashboardReport.rejected, (state, action) => {
            state.isloading = false,
                state.message = "you dashboard peort is Rejected"
        })


    }


})

export default DashboardReportSlice.reducer
export const { add } = DashboardReportSlice.actions