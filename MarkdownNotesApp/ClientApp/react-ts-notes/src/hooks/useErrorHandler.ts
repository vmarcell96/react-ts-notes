import { toast } from 'react-toastify';
import axios from 'axios';


export type CustomError = {
    requestUrl: string,
    requestMethod: string,
    errorName?: string,
    errorMessage?: string,
    errorResponseData?: string,
    errorResponseStatus?: number,
}


const useErrorHandler = () => {

    const showErrorToast = (message: string) => {
        toast.error(message);
    };

    const handleError = (url: string, method: string, err: unknown) => {

        let customError: CustomError = {
            requestUrl: url,
            requestMethod: method,
        }

        if (axios.isAxiosError(err)) {
            if (err.response) {
                // Server was able to send us a response, so this is an API Error.
                customError = {
                    ...customError,
                    errorName: err.name,
                    errorMessage: err.message,
                    errorResponseData: err.response?.data,
                    errorResponseStatus: err.response?.status
                }
            } else {
                // Axios was not able to get a response at all. This is a Network-Level Error.
                console.error('[Network Error]: No Response Received At', err.config?.url);
            }

        } else {
            // Standard JS Error (Syntax, etc...)
            console.error("[Non-HTTP Error]:", err);
        }
        let errorMessage = `Error at: ${customError.requestUrl}, Request method: ${customError.requestMethod}`;
        if (customError.errorName) {
            errorMessage += ` Error message: ${customError.errorMessage}, Response data: ${customError.errorResponseData}, Response status: ${customError.errorResponseStatus} `
        }
        showErrorToast(errorMessage);
    }
    return { handleError }
}

export default useErrorHandler;