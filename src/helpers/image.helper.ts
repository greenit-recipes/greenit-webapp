import _ from "lodash";

export const getImagePath = (imageProfile: string = "") => {
    if (imageProfile) {
        return process.env.REACT_APP_AWS_URL + imageProfile;
    }
}