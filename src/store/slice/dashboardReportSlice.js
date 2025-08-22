import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { retry } from "@reduxjs/toolkit/query";
import { act } from "react";




export const dashboardReport = createAsyncThunk(
    "report/download",
    async ({ startDate, endDate, type, isOnline }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://api.thailash.com/order/reports?startDate=${startDate}&endDate=${endDate}&type=${type ? "B2B" : "B2C"}&isOnline=${isOnline}`
            );

            const result = await response.json();

            if (!result?.data) {
                return rejectWithValue("No data found");
            }

            // Convert JSON → Excel Sheet
            const worksheet = XLSX.utils.json_to_sheet(result.data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

            // Trigger download
            saveAs(blob, type ? "B2B-report.xlsx" : "B2C-report.xlsx");

            return result; // also return data for state if needed
        } catch (error) {
            return rejectWithValue(error.message || "Error downloading report");
        }
    }
);


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


