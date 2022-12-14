import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'chet.gerhold49@ethereal.email',
    pass: 'xMhGq4eNXSgqcYsKcS',
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