import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

const Mail = async (html) => {
  try {
    let mailOptions = {
      from: process.env.EMAIL,
      to: 'isaacoyeniyi06@gmail.com',
      subject: 'Your To-do handler.',
      html,
    };

    await transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
}


export default Mail