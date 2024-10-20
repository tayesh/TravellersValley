import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import Review from "../Review/Review";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';




const RoomDetails = () => {
    let [room,setRooms] = useState(useLoaderData());
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [BookedByThisUser, setBookedByThisUser] = useState(false);







    const { _id, RoomDescription, Description, PricePerNight, RoomSize, Availability, AvailableDates, RoomImages, SpecialOffers, Rating } = room;
    useEffect(() => {
        fetch(`http://localhost:5002/reviews/${_id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setReviews(data);
            })
    }, [reviews]);

    useEffect(() => {
        fetch(`http://localhost:5002/bookings?roomId=${_id}&userId=${user.uid}`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setBookedByThisUser(true);
                    console.log(data, BookedByThisUser);
                }
            })
    }, [room])

    const handlereview = (event) => {
        event.preventDefault();
        const form = event.target;
        const review = form.review.value;
        const newReview = {
            reviewer: {
                name: user.displayName,
                photo: user.photoURL,
                email: user.email
            },
            content: review,
            roomId: _id
        }
        console.log(newReview);
        fetch("http://localhost:5002/reviews", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newReview),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    reviews.push(newReview);
                    form.reset();
                    toast.success("Review posted Successfully")
                }
            })




    }


    const handleBook = (event) => {
        event.preventDefault();
        const form = event.target;
        const time = form.date.value;
        const currentTime = moment().format();
        const currentDate = parseInt(currentTime.substring(8, 10));
        const date = parseInt(time.substring(8, 10));
        const month = parseInt(time.substring(6, 8));
        const currentMonth = parseInt(currentTime.substring(6, 8));

        const newBooking = {
            roomId: _id,
            room:room,
            userId: user.uid,
            dateString:null,
            date: null,
            ispending:true



        }

        if (month - currentMonth == 0) {
            if (date - currentDate < 0) {
                toast.error("Please choose a valid Date")
            }
            else {
                if (AvailableDates.includes(date)) {
                    toast.error("This Date is Already Booked")
                }
                else {

                    newBooking.date = date;
                    newBooking.dateString=time.substring(0, 10)

                }
            }

        }
        else if (month - currentMonth < 0 || month - currentMonth > 1) {

            toast.error("Please choose a valid Date")

        }
        else {
            console.log(date);
            newBooking.date = date;
            newBooking.dateString=time.substring(0, 10)


        }
        if (newBooking.date != null) {
            fetch("http://localhost:5002/bookings", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newBooking),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        fetch(`http://localhost:5002/rooms/${_id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ newDate:newBooking.date,delete:false })
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log("Response:", data);
                                fetch(`http://localhost:5002/rooms/${_id}`)
                                .then(res=>res.json())
                                .then(data=>{
                                    setRooms(data);
                                    toast("Booked Successfully")
                                })
                                
                            })
                    }
                })

             
        }
        









    }

    return (
        <div className="grid grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
                <div className="carousel border-[10px] border-[#ff8800]">
                    <div id="item1" className="carousel-item w-full ">
                        <img src={RoomImages[0]} className="w-full" />
                    </div>
                    <div id="item2" className="carousel-item w-full ">
                        <img src={RoomImages[1]} className="w-full" />
                    </div>
                    <div id="item3" className="carousel-item w-full ">
                        <img src={RoomImages[2]} className="w-full" />
                    </div>
                </div>
                <div className="flex justify-center w-full py-2 gap-2">
                    <a href="#item1" className="btn btn-xs">1</a>
                    <a href="#item2" className="btn btn-xs">2</a>
                    <a href="#item3" className="btn btn-xs">3</a>
                </div>
                <button onClick={() => document.getElementById('my_modal_5').showModal()} className='btn bg-[#ff8800] border-none hover:bg-[#ffb056] mt-4 w-full bhand text-xl'>{room.Availability ? "Book Now" : "Book for Later"}</button>
            </div>
            <div className="p-12 h-screen">
                <h2 className="pon text-3xl  text-[#8f540f]">{RoomDescription}</h2>
                <p className="text-xl bhand mt-5">{Description}</p>
                <div className="flex justify-start gap-10 mt-5 text-xl">
                    <p className="bhand"><span className="pon">Space</span> : {RoomSize}</p>
                    <p className="bhand"><span className="pon">Price</span> : ${PricePerNight}</p>
                </div>
                <div className="flex justify-start gap-10 mt-5 text-xl">
                    <p className="bhand"><span className="pon">Availability</span> : {Availability ? "Available tonight" : "Not Available Tonight"}</p>
                    <p className="bhand"><span className="pon">Rating</span> : {Rating}/5</p>
                </div>
                <h3 className="text-2xl pon text-[#8f540f] pt-5">Reviews</h3>
                {
                    BookedByThisUser ? <form onSubmit={handlereview} className=" w-full py-5 flex items-center gap-5">
                        <textarea placeholder="Give a Review" name="review" className="textarea textarea-bordered textarea-sm w-full" ></textarea>
                        <button type="submit" className="btn"><IoSend /></button>

                    </form> :
                        <></>
                }
                <div >
                    <div className="border-2 border-[#8f530f70] p-3 min-h-40  max-h-60 overflow-y-scroll bg-scroll rounded-xl snap-y bg-[#8f530f36]">
                        {
                            !reviews.length == 0
                                ?
                                reviews.map(review => <Review review={review}></Review>)
                                :
                                <h2 className="text-center bhand">Be the first to give a review</h2>
                        }
                    </div>

                </div>
                {/* modal */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <form onSubmit={handleBook}>
                            <input type="date" name="date" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            <input type="submit" className="btn" />
                        </form>
                        <div className="modal-action">
                            <form method="dialog">

                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>


            </div>


        </div>
    );
};

export default RoomDetails;