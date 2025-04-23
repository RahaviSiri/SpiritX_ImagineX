import userModel from "../models/userModel.js";
import { transporter } from "../config/nodemailer.js";

const contactForm = async (req, res) => {
    try {
        const { email, question } = req.body;

        if (!email || !question) {
            return res.status(400).json({ success: false, message: "Email and question are required." });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        const mailOptions = {
            from: user.email,
            to: process.env.ADMIN_EMAIL,
            subject: `Question from ${user.name}`,
            html: `
                <p>Dear Sir,</p>
                <p>${question}</p>
                <p>Thank you!</p>
            `,
        }
        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: "Message sent successfully" })
    } catch (error) {
        console.error("Error sending contact form email:", error);
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
    }
}

export { contactForm }