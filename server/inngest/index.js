import { Inngest } from "inngest";
import User from "../models/user.js";
import Booking from "../models/booking.js";
import sendEmail from "../configs/nodeMailer.js";
import Show from "../models/show.js";


// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

//Inngest function to save user data to a database
const syncUserCreation = inngest.createFunction(
    {id : 'sync-user-from-clerk'},
    {event : 'clerk/user.created'},
    async({event})=>{
        const {id , first_name ,last_name,email_addresses ,image_url}=event.data
        const userData = {
            _id : id,
            email:email_addresses[0].email_address,
            name:first_name +' '+last_name,
            image:image_url
        }
        await User.create(userData)
    }
)

//Inngest function to delete user from database
const syncUserDeletion = inngest.createFunction(
    {id : 'delete-user-with-clerk'},
    {event : 'clerk/user.deleted'},
    async({event})=>{
        const {id}= event.data
        await User.findByIdAndDelete(id)
              
    }
)

//Inngest function to update user data in database 
const syncUserUpdation = inngest.createFunction(
    {id : 'update-user-with-clerk'},
    {event : 'clerk/user.updated'},
    async({event})=>{
         const {id , first_name ,last_name,email_addresses ,image_url}=event.data
          const userData = {
            _id : id,
            email:email_addresses[0].email_address,
            name:first_name +' '+last_name,
            image:image_url
        }
        await User.findByIdAndUpdate(id,userData)
              
    }
)

const sendBookingConfirmationEmail = inngest.createFunction(
  { id: "send-booking-confirmation-email" },
  { event: "app/show.booked" },
  async ({ event, step }) => {
    const { bookingId } = event.data;
    
    await step.run("process-email", async () => {
      const booking = await Booking.findById(bookingId)
        .populate({
          path: "show",
          populate: { path: "movie", model: "Movie" },
        });

      if (!booking) return;

      const { clerkClient } = await import("@clerk/express");
      const user = await clerkClient.users.getUser(booking.user);
      if (!user) return;

      const userEmail = user.emailAddresses[0].emailAddress;
      const userName = (user.firstName || "") + " " + (user.lastName || "");

      const showDate = new Date(booking.show.showDateTime);
      const formattedDate = showDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
      const formattedTime = showDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      await sendEmail({
        to: userEmail,
        subject: `Payment Confirmation: "${booking.show.movie.title}" booked!`,
        body: `<div style="font-family:Arial,sans-serif; line-height:1.6; color:#333;">
                  <h2>Hi ${userName},</h2>
                  <p>Your booking for <strong>${booking.show.movie.title}</strong> is confirmed!</p>
                  <div style="background-color:#f9f9f9; padding:15px; border-radius:8px; margin: 20px 0;">
                      <h3 style="margin-top:0;">Booking Details:</h3>
                      <ul style="list-style:none; padding:0; margin:0;">
                        <li style="margin-bottom:8px;"><strong>🎬 Movie:</strong> ${booking.show.movie.title}</li>
                        <li style="margin-bottom:8px;"><strong>📅 Date:</strong> ${formattedDate}</li>
                        <li style="margin-bottom:8px;"><strong>⏰ Time:</strong> ${formattedTime}</li>
                        <li style="margin-bottom:8px;"><strong>🪑 Seats:</strong> ${booking.bookedSeats.join(", ")}</li>
                        <li style="margin-bottom:0;"><strong>💰 Total Price:</strong> ₹${booking.amount}</li>
                      </ul>
                  </div>
                  <p>Enjoy the show!</p>
               </div>`,
      });

      console.log("Email sent successfully!");
    });
    
    return { success: true };
  }
);


// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation,syncUserDeletion,syncUserUpdation,sendBookingConfirmationEmail];