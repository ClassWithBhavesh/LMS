import API from "./api";


export const getCourseDetails = async(courseId) => {
    const response = await API.get(`/course/${courseId}`);
    return response.data;
}

export const createPaymentOrder = async(courseId) => {
    const response = await API.post(`/payment/create-order`, {
        courseId
    });
    return response.data;
}

export const verifyPayment = async(paymentData) => {
    const response = await API.post("/payment/verify-payment", paymentData);
    return response.data;
}



