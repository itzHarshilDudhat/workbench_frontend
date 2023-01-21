import { toast } from "react-toastify";

export const catchResponse = (error) => {
    let message;
    for (var key in error) {
        if (key === "request") {
            let responseMessage = JSON.parse(error[key].response);
            toast.error(responseMessage.message);
            return;
        } else {
            message = "Something is wrong please try again!";
        }
    }
    toast.error(message);
};
