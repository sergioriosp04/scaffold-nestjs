import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailService {
  private transporter: any

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  async sendEmail(to: string, subject: string, message: string): Promise<any> {
    await this.transporter.sendMail({
      // from: 'tu_correo@gmail.com',
      from: process.env.SMTP_EMAIL_HOST,
      to,
      subject,
      html: message,
    })
  }
}
