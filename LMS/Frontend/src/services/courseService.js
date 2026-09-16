import API from "./api";



export const checkAccess = async(courseId) => {
    const response = await API.get(`/course/${courseId}/access`);
    console.log("response from checkAccess -", response);
    return response.data;
}

export const getCourseBySlug = async(slug) => {
    const response = await API.get(`/course/slug/${slug}`);
    return response.data;
}

export const getAllCourses = async() => {
   const response = await API.get("/course");
   return response.data;
}

