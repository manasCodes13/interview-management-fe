import axios from "axios";
import { userDetailsPropsInterface, userUpdatePropsInterface } from "./commonInterface";
import { BASE_URL } from "@/utils/network";

const userDetails = "/common/getUserDetails";
const getTeamMatesAPI = "/common/getTeammates";
const updateUserAPI = "/common/updateUser"

export const getUserDetails = async ({
  accessToken,
  email,
}: userDetailsPropsInterface) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  try {
    const getUserDetailsAPICall: any = await axios.get(
      `${BASE_URL}${userDetails}?email=${email}`,
      { headers: headers }
    );

    if (getUserDetailsAPICall) {
      return getUserDetailsAPICall?.data;
    }
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateuser = async ({ accessToken, email, data }: userUpdatePropsInterface) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const body = {
    email: email,
    data: data,
  }

  try {
    const updateUserAPICall = await axios.put(
      `${BASE_URL}${updateUserAPI}`,
      body,
      { headers: headers },
    );

    if (updateUserAPICall) {
      return updateUserAPICall?.data
    }
  }
  catch (err: any) {
    return err?.response?.data;
  }
}

export const getTeamMates = async (accessToken: string, orgId: string) => {
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  try {
    const getTeamDetailsAPICall: any = await axios.get(
      `${BASE_URL}${getTeamMatesAPI}?orgId=${orgId}`,
      { headers: headers }
    );

    if (getTeamDetailsAPICall) {
      return getTeamDetailsAPICall?.data;
    }
  }
  catch (err: any) {
    return err?.response?.data
  }
}