import Booking from "../models/booking.js"
import Show from "../models/show.js"
import User from "../models/user.js"

export const isAdmin = async (req,res)=>{
    res.json({success:true,isAdmin:true})
}

export const getDashboardData = async(req,res)=>{
    try {
        const bookings = await Booking.find({isPaid:true})
        const activeShows = await Show.find({showDateTime:{$gte:new Date()}}).populate('movie');

        const { clerkClient } = await import("@clerk/express");
        const totalUser = await clerkClient.users.getCount();

        const dashboardData ={
            totalBookings :bookings.length,
            totalRevenue: bookings.reduce((acc, booking)=>acc + booking.amount, 0),
            activeShows,
            totalUser
        }

        res.json({success:true , dashboardData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message: error.message})
    }
}

export const getAllShows = async(req,res)=>{
    try {
        const shows = await Show.find({showDateTime:{$gte : new Date()}}).populate('movie').sort({showDateTime : 1})
        res.json({success:true , shows})
    } catch (error) {
        console.log(error);
        res.json({success:false,message: error.message})
    }
}

export const getAllBookings = async (req,res)=>{
    try {
        const bookings = await Booking.find({}).populate({
            path: "show",
            populate:{path:"movie"}
        }).sort({createdAt : -1}).lean();

        const { clerkClient } = await import("@clerk/express");
        const augmentedBookings = await Promise.all(bookings.map(async (doc) => {
            if (typeof doc.user === 'string') {
                try {
                    let userDoc = await User.findById(doc.user).lean();
                    if (userDoc) {
                        doc.user = userDoc;
                    } else {
                        const clerkUser = await clerkClient.users.getUser(doc.user);
                        doc.user = {
                            _id: doc.user,
                            name: (clerkUser.firstName || "") + ' ' + (clerkUser.lastName || ""),
                            email: clerkUser.emailAddresses[0]?.emailAddress,
                            image: clerkUser.imageUrl
                        };
                    }
                } catch (e) {
                    doc.user = { name: "N/A" };
                }
            }
            return doc;
        }));

        res.json({success:true,bookings:augmentedBookings})
    } catch (error) {
        console.log(error);
        res.json({success:false,message: error.message})
    }
}
