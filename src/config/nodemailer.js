import nodemailer from 'nodemailer'
import env from "dotenv";
env.config();

var transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure:false,
    logger:true,
    debug:true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  });