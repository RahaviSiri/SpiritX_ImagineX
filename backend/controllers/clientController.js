import { transporter } from "../config/nodemailer.js";
import clientModel from "../models/clientModel.js";
import coachModel from "../models/coachModel.js";

export const registerClient = async (req, res) => {
    try {
        const body = req.body;
        if (!body) {
            res.json({ success: false, message: "Body is required" })
        }
        const client = await new clientModel({
            coachId: body.coachId,
            fullName: body.fullName,
            email: body.email,
            contactNumber: body.contactNumber,
            addressLine1: body.addressLine1,
            addressLine2: body.addressLine2,
            city: body.city,
            district: body.district,
            preferredDateTime: body.preferredDateTime,
            notes: body.notes,
        })

        await client.save();

        const coach = await coachModel.findById(body.coachId);
        if (!coach) {
            console.log("not coach")
            return res.status(404).json({ success: false, message: "Coach not found" });
        }
        if (!coach.contactDetails.email) {
            console.log("not email")
            return res.status(400).json({ success: false, message: "Coach email not found" });
        }
        // console.log(coach);
        // console.log(client._id)

        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: coach.contactDetails.email,
            subject: `New Coaching Request from ${client.fullName}`,
            html: `
          Hello ${coach.personalInfo.fullName},
          
          You have received a new coaching request from a potential client.
          
          Client Details:
          ---------------
          Name: ${client.fullName}
          Email: ${client.email}
          Contact: ${client.contactNumber}
          City: ${client.city}, District: ${client.district}
          Preferred Date & Time: ${new Date(client.preferredDateTime).toLocaleString()}
    
          Additional Notes:
          ${client.notes || "No additional notes provided."}
          
          Please respond at your earliest convenience.
          <p>
            Click the button below to approve this request and send an OTP to the client:
            </p>

        <a href="http://localhost:3000/api/admin/approve-by-coach/${client._id}" 
            style="display:inline-block;padding:10px 20px;background:#28a745;color:white;text-decoration:none;border-radius:5px;">
            Approve & Send OTP
        </a>
        <a href="http://localhost:3000/api/admin/reject-by-coach/${client._id}" 
        style="display:inline-block;padding:10px 20px;background:#dc3545;color:white;text-decoration:none;border-radius:5px;">
            Reject
        </a>

          
          Best regards,  
          Your Coaching Platform
          `
        };
        try {
            await transporter.sendMail(mailOptions);
        } catch (emailErr) {
            console.log(emailErr)
            console.error("Email sending failed:", emailErr);
        }


    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })

    }
}