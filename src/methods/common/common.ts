import axios from "axios";
import { userDetailsPropsInterface } from "./commonInterface";
import { BASE_URL } from "@/utils/network";

const userDetails = "/common/getUserDetails";

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
