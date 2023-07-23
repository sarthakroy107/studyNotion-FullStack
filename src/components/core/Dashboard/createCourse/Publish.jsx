import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { courseEndpoints } from "../../../../services/api";
import { apiConnector } from "../../../../services/apiconnector";
import { AiOutlineLeft } from "react-icons/ai"
import { useSelector } from "react-redux";

const Publish = () => {
    const [box, setBox] = useState(true)
    const [course, setCourse] = useState({})
    const {id} = useParams();
    const navigate = useNavigate()
    const {token} = useSelector((state)=>state.auth)
    const handlePublish = async () => {
        try{
            const res = await apiConnector("POST", courseEndpoints.PUBLISH_COURSE_API, {courseId: id}, {
                Authorization: `Bearer ${token}`,
            })
            if(res.data.data === true) {
                navigate('/dashboard/my-courses')
            }

        }
        catch(err) {
            console.log(err)
        }
    }
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
    <main className="w-full flex flex-col items-center min-h-screen p-3">
        <div className="w-4/5 bg-richblack-800 p-5 px-8 rounded-lg">
            <p className="text-3xl font-semibold mb-4">Publish course</p>
            <div>
                <input onChange={()=>setBox(!box)} type="checkbox" className="mr-3 relative mb-1" />
                <label className="text-xl">I agree to terms and conditions</label>
            </div>
            <div className="">
                <button className="bg-richblack-700 text-lg p-1 px-2 rounded-md 
                shadow-[2.0px_2.0px_1.0px_rgba(225,225,225,0.3)] mr-5"
                > <p className="flex"><AiOutlineLeft className="relative top-[0.30rem] mx-1"/> Back</p></button>
                <button className="bg-richblack-700 text-lg p-1 px-2 rounded-md 
                shadow-[2.0px_2.0px_1.0px_rgba(225,225,225,0.3)] mx-5"
                >Save</button>
                <button disabled={box} className='bg-yellow-300 p-1 px-2 rounded-md text-richblack-800 
                text-lg font-medium mt-4'
                onClick={handlePublish}
                >Save and Publish</button>
            </div>
        </div>
    </main>
  )
}

export default Publish