import _ from "lodash";

export const getImagePath = (urlImage: string = "") => {
    if (urlImage) {
        return process.env.REACT_APP_AWS_URL + urlImage;
    }
}