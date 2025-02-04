import dotenv from "dotenv";
dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
const STRIPE_SECRET_KEY = "sk_test_51QnQzSA4N9NOGpc4VezjFyPCMtbDzOVsAKc4yJhbHYwkizVvJdxZZ8QGXVlpWcubJmnU3MjQw8xP4IixKCAEOK0800xSV3V8Vk";

export default {
    JWT_USER_PASSWORD,
    JWT_ADMIN_PASSWORD,
    STRIPE_SECRET_KEY,
}