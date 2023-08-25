import nodemailer, { SendMailOptions } from "nodemailer";

import config from "config";
import log from "./logger";


// Purpose:
// When we create a user we want to send them an email with their
// - validationID and
// - userID 
// to verify thier email adress


// Fake SMTP-Server: 
// * For Production connect to a real SMTP-Server

const createTestCreds = async () => {
  const creds = await nodemailer.createTestAccount(); // use API URL Argument to connect to a mail server
  console.log({ creds })
};

// createTestCreds(); // run when you need some test credentials

const smtp = config.get<{
  user: string,
  pass: string,
  host: string,
  port: number,
  secure: boolean
}>("smtp")

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
});

export const sendMailx = (payload: SendMailOptions) => new Promise((resolve, reject) => {
  transporter.sendMail(payload, (err, info) => {

    if (err) {
      log.error(err, 'Error sending email');
      reject(err);
    }

    const previewURL = nodemailer.getTestMessageUrl(info)
    resolve(previewURL)
  })
});


