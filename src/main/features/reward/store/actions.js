import { createAsyncThunk } from "@reduxjs/toolkit";
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
    console.log(response.data, "GET ALL REWARDS")
		return response.data;
	}
);

export const GetRewardById = createAsyncThunk(
	"Reward/GetRewardById",
	async data => {
		const response = await GetRewardByIdService(data);
    console.log(response.data, "GET REWARD ID")
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