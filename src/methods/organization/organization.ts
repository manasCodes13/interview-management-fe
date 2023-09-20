import axios from "axios";
import { inviteTeamMatesMethodInterface, joinTeamMatesMethodInterface } from "./orgInterface";
import { BASE_URL } from "@/utils/network";

const inviteTeammatesAPI = "/organization/invite-teamMates";
const joinOrganizationAPI = "/organization/join-organization"



export const inviteTeamMatesMethod = async ({ accessToken, email, userEmail }: inviteTeamMatesMethodInterface) => {
    const headers = {
        Authorization: "Bearer " + accessToken,
    };
    const body = {
        email: email,
        userEmail: userEmail
    }

    try {
        const inviteTeamMatesFun = await axios.post(`${BASE_URL}${inviteTeammatesAPI}`, body, { headers: headers });
        if (inviteTeamMatesFun) {
            return inviteTeamMatesFun?.data;
        }
    }
    catch (err: any) {
        return err?.response?.data;
    }
}

export const joinOrganization = async ({ accessToken, email, id }: joinTeamMatesMethodInterface) => {
    const headers = {
        Authorization: "Bearer " + accessToken,
    };
    const body = {
        email: email,
        id: id
    }

    try {
        const joinTeamMatesFun = await axios.post(`${BASE_URL}${joinOrganizationAPI}`, body, { headers: headers });
        if (joinTeamMatesFun) {
            return joinTeamMatesFun?.data;
        }
    }
    catch (err: any) {
        return err?.response?.data;
    }

}