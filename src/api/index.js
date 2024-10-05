import axios from "axios";

const accessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNlNmIxOGVjYzk3OTkwMTQ1ODFhZjVlMTY1ZDA4YzQzNWEzMjY4MzQ3ZDI2NjA5MzI3ZmNmMjMzMmUyYjI2ZDE4ZTI3ZjMzZmU1MDc2ZTY4In0.eyJhdWQiOiI0NWM4ZjUyZC04OGQ2LTQyZjQtYjRlMS01MTNhOWFlZjAxZjMiLCJqdGkiOiIzZTZiMThlY2M5Nzk5MDE0NTgxYWY1ZTE2NWQwOGM0MzVhMzI2ODM0N2QyNjYwOTMyN2ZjZjIzMzJlMmIyNmQxOGUyN2YzM2ZlNTA3NmU2OCIsImlhdCI6MTcyNzk0NjgzOCwibmJmIjoxNzI3OTQ2ODM4LCJleHAiOjE3MzAzMzI4MDAsInN1YiI6IjExNTk2NjAyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTg1MzkwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMjZjYTU2MjQtNGUwNi00ZThkLTg5OTYtZDQxNjI5MjFmYTAwIiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.jZFfOdqjsMJl-5ZlWrJb4yswLdkY4fu_FEy7EvAeztfjk2BoILRKU7IzJas1mKCiD_aaveuVaGxtNiIbqmpsBYTGe4Qe_WeXemqt7p-pSHiC2i2WU_1Yr3x7IPbrBq-vMNELkKp8BiDYcR8l2rFlCNCPOqlc3sM644KYDJSZcSIiPmJwgD2VW3x_CQTwe_8Sgq9RSgYNWBi6yUcT9C-Q2xtwkBBezSYlKBL9grHeRZrLztsyiTxxumyUsIQ67sCAal-na2QzMiv9eKJpA-0jakLv4kaFgFQk-LUCJUZmIcaFY-koMCdRs4rYxi7tb1xlDeIRAgWauAHsAB5gTwKIZA";
export const getInfo = async (url) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res) {
      return res.data;
    }
  } catch (error) {
    throw new Error(`Ошибка при получении данных: ${error.message}`);
  }
};
