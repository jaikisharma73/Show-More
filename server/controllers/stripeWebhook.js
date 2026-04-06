import stripe from "stripe";
import Booking from "../models/booking.js";
import { clerkClient } from "@clerk/express";
import sendEmail from "../configs/nodeMailer.js";


export const completeCheckout = async (bookingId) => {
    await Booking.findByIdAndUpdate(bookingId, {
      isPaid: true ,
      paymentLink: " ", // ✅ Optional
    });
    
    //send confimation email directly
    try {
      const booking = await Booking.findById(bookingId).populate({
        path: "show",
        populate: { path: "movie", model: "Movie" },
      });

      if (booking) {
        const user = await clerkClient.users.getUser(booking.user);
        if (user) {
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
          console.log("✅ Email sent successfully without Inngest!");
        }
      }
    } catch (emailError) {
      console.error("Failed to send email directly:", emailError.message);
    }
    console.log("✅ Booking marked as paid:", bookingId);
};

export const stripeWebhooks = async (request, response) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];

  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body, // Make sure you're using raw body!
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Stripe signature verification failed:", error.message);
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    // ✅ Listen for correct event type
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const bookingId = session.metadata?.bookingId;
      if (!bookingId) {
        console.log("Missing booking ID in session metadata");
        return response.status(400).send("Missing booking ID");
      }
      
      await completeCheckout(bookingId);
      //send confimation email
    } else {
      console.log("Unhandled event type:", event.type);
    }

    response.status(200).json({ received: true });
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    response.status(500).send("Internal Server Error");
  }
};
