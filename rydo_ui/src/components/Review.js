import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./footer";
import checkAuth from "./auth/checkAuth";


function Review() {

    const { rideId } = useParams();
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [hovered, setHovered] = useState(0);


    // ⭐ handle rating
    // const handleRating = (value) => {
    //     setRating(value);
    // };

    // // 📝 handle review
    // const handleReviewChange = (e) => {
    //     setReview(e.target.value);
    // };

    const handleSubmit = () => {

        if (rating === 0) {
            alert("Please select rating");
            return;
        }

        const token = localStorage.getItem("access");

        if (!token) {
            navigate("/login");
            return;
        }

        axios.post(
            `http://127.0.0.1:8000/user/review/${rideId}/`,
            {
                rating: rating,
                review: review
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        .then((response) => {
            alert("Rating submitted successfully");
            navigate("/user-history");
        })

        .catch((error) => {
            console.log("Error submitting rating:", error);

            if (error.response && error.response.status === 401) {
                localStorage.removeItem("access");
                navigate("/login");
            } else {
                alert(error.response?.data?.error || "Error submitting rating");
            }
        });
    };

    return (
        <div>
            <Navbar/>
            <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-md p-9 w-full max-w-sm mb-40">
            
                    {/* Header */}
                    <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Rate Your Ride</h2>
                    <p className="text-gray-400 text-sm mt-1">How was your ride?</p>
                    </div>
            
                    {/* Stars */}
                    <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        className="text-3xl transition-transform hover:scale-110"
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                        >
                        {/* <span className={star <= (hovered || rating) ? "text-yellow-400" : "text-gray-200"}>
                            ★
                        </span> */}
                            <span className={star <= (hovered || rating) ? "text-yellow-400" : "text-gray-200"}>
                                <FaStar />
                            </span>
                        </button>
                    ))}
                    </div>
            
                    {/* Textarea */}
                    <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write a comment"
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 resize-none focus:outline-none focus:border-blue-400 mb-4"
                    />
            
                    {/* Submit Button */}
                    <button
                    onClick={ handleSubmit }
                    className={`w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity ${
                        rating > 0 ? "bg-zinc-900 hover:bg-zinc-700" : "bg-zinc-300 cursor-not-allowed"
                    }`}
                    >
                    Submit Review
                    </button>
            
                </div>
            </div>
            <Footer/>
    </div>
    );
}

export default checkAuth(Review);