import nodemailer from "nodemailer";

export async function sendEmail(to, subject, html) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,  // your Gmail
            pass: process.env.GMAIL_PASS   // App password, not regular password
        }
    });

    await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to,
        subject,
        html
    });
}
