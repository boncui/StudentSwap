import express, {Request, Response} from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

//Need to configre the nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.Email_USER,
        pass: process.env.EMAIL_PASS,
    },
});

//Handle Feedback form submission
router.post("/", async (req: Request, res: Response) => {
    const {name, email, message} = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({error: "All fields are required."});
    }

    const mailOptions = {
        from: email,
        to: process.env.RECIEVING_EMAIL,
        subject: `New Feedback from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };


    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Feedback was sent successfully! :D"});
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({error: "Failed to send feedback." });
    }
});

export default router;
