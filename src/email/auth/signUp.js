import Transport from "../../config/nodemailer";

const signUpMail = (name, email) => {
  let mailOptions = {
    from: "muhammad.maher9999@gmail.com",
    to: `${email}`,
    subject: " Registration of Store",
    text: "Hey , it’s our first message sent with Nodemailer ",
    html: `<b>Hey ${name}! </b><br> This is our first message sent with Nodemailer<br />`,
  };

  Transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: ", info.messageId);
  });
};

export default signUpMail;
