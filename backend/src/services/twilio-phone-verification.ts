import { Twilio } from "twilio";
import * as dotenv from "dotenv";

dotenv.config();

const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const request_to_send_opt_message = async (phone_number: string) => {
  const verification = await client.verify.v2
          .services(process.env.TWILIO_VERIFY_SID!)
          .verifications.create({ to: phone_number, channel: "sms" });
  return verification.status === "pending";
};

export const request_to_verify_opt_code = async (phone_number: string, otp_code: string) => {
  const verification_check = await client.verify.v2
          .services(process.env.TWILIO_VERIFY_SID!)
          .verificationChecks.create({ to: phone_number, code: otp_code });
  return verification_check.status === "approved";
};