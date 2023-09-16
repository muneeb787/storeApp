import Transport from "../../config/nodemailer.js";

const signInMail = (name, email) => {
  let mailOptions = {
    from: "muhammad.maher9999@gmail.com",
    to: `${email}`,
    subject: " Logged Into the Store",
    text: "Hey , it’s our first message sent with Nodemailer after login ",
    html: `<b>Hey ${name}! </b><br> This is our first message sent with Nodemailer after login <br />`,
  };

  Transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: ", info.messageId);
  });
};

export default signInMail;
