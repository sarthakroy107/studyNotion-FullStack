import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { courseEndpoints } from "../../../../services/api";
import { apiConnector } from "../../../../services/apiconnector";

const Publish = () => {
    const [course, setCourse] = useState({})
    const {id} = useParams();
    const fetchCourse = async () => {
        console.log("Id: " + id)
        const res = await apiConnector("PUT", courseEndpoints.GET_SECTION_DEATILS, {
            courseId: id,
        })
        setCourse(res.data.data)
        console.log(res.data.data)
    }

    useEffect(()=>{
        fetchCourse();
    }, [])


  return (
    <main className="w-full flex justify-center min-h-screen">
        <h2>Publish course</h2>
        <div className="w-4/5">
            
        </div>
    </main>
  )
}

export default Publish