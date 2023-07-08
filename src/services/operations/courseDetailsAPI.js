import { courseEndpoints } from "../api";
import { apiConnector } from "../apiconnector";

const {
    GET_ALL_COURSE_API,
  COURSE_DETAILS_API,
  EDIT_COURSE_API,
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  LECTURE_COMPLETION_API,
  CREATE_RATING_API,
} = courseEndpoints

export const getCourseDetails = async (courseId) => {
    let result = null;
    console.log("In getCourseDetails")
    try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, {
            courseId
        })
        result = response
        return result
    }
    catch(err) {
        console.log("Could not fetch course details")
        console.log(err)
    }
}