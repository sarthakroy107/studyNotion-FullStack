import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../api";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror= () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse (token, courses, userDetails) {
    const toastId = toast.loading("Loading...")
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        const orderRes = await apiConnector("POST", studentEndpoints.COURSE_PAYMENT_API, {courses}, {
            Authorization: `Bearer ${token}`
        })
        if(!orderRes.data.success) {
            throw new Error(orderRes.data.message);
        }
        console.log("PRINTING orderResponse", orderRes);
        const options = {
            key: "rzp_test_c92ilIZyWkvqCb",
            currency: orderRes.data.message.currency,
            amount: `${orderRes.data.message.amount}`,
            order_id:orderRes.data.message.id,
            name:"StudyNotion",
            description: "Thank You for Purchasing the Course",
            prefill: {
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            notes: {
                "courseId" : JSON.stringify(courses),
                "userId" : userDetails._id,
            }

        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })

    }
    catch(err) {
        console.log(err)
    }
    toast.dismiss(toastId)
}