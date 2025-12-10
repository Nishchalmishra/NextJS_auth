import nodemailer from "nodemailer"
import { User } from "@/src/models/userModel";
import bcrypt from "bcryptjs"

export const sendEmail = async ({ email, emailType, userId}:any) => { 
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "2e430c70999392",
            pass: "740e6d277d9174",
            },
        });

        const mailOptions = {
            from: "nishchalmishra14@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${(emailType === "VERIFY") ? "verifyemail" : "resetpassword"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`,
        }


        const mailResponse = await transport.sendMail(mailOptions);

    } catch (error) {
        throw new Error("Error in sending email");
    }
}