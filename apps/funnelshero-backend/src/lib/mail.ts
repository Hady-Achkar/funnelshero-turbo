import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'kristian.ritchie67@ethereal.email',
    pass: 'nqu8xXGE2w556FG4sF',
  }
});

async function sendMail(email: string, subject: string, message: string): Promise<any> {
  await transporter.sendMail({
    from: 'test@example.com',
    to: email,
    subject: subject,
    text: message,
  })
}

export default sendMail;