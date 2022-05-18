import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { addRewardService, getAllRewardService, GetRewardByIdService } from "../services/service";

// export const getAllRewards = createAsyncThunk(
//   "reward/GetAllReward",
//   async (args, { dispatch, setState }) => {
//     const response = await getAllRewardsService();
//     if (!response.responseCode) {
//       responseMessage({
//         dispatch: dispatch,
//         type: responseMessageType.ApiFailure,
//       });
//     }
//     return response.data;
//   }
// );

export const getAllRewards = createAsyncThunk(
	"reward/GetAllReward",
	async data => {
		const response = await getAllRewardService(data);
    
    if (!response.responseCode) {
        message.error("Something went wrong")
    }
		return response.data;
	}
);

// export const getAllGrades = createAsyncThunk(
// 	"grade/getAllGrade",
// 	async ({ dispatch }) => {
// 		const res = await getAllGradesService();

// 		if (!res.responseCode) {
// 			responseMessage({
// 				dispatch: dispatch,
// 				type: responseMessageType.ApiFailure,
// 			});
// 		}
// 		return res;
// 	}
// );


export const GetRewardById = createAsyncThunk(
	"Reward/GetRewardById",
	async id => {
		const response = await GetRewardByIdService(id);
    console.log("MY ID", id)
		return response.data;
	}
);


export const addReward = createAsyncThunk(
  "reward/addReward",
  async (args, {dispatch, setState}) => {
    const response = await addRewardService(args);
    console.log(args, "FROM ACTION")
    return response
  }
)