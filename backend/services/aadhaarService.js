// services/aadhaarService.js
import axios from 'axios';

const SUREPASS_API_KEY = process.env.SUREPASS_API_KEY;
const SUREPASS_BASE_URL = 'https://kyc-api.surepass.io/api/v1';

export async function verifyAadhaarOTP(aadhaar) {
  try {
    // Step 1: Generate OTP
    const otpResponse = await axios.post(
      `${SUREPASS_BASE_URL}/aadhaar-v2/generate-otp`,
      { id_number: aadhaar },
      {
        headers: {
          'Authorization': `Bearer ${SUREPASS_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      success: true,
      client_id: otpResponse.data.data.client_id,
      message: 'OTP sent to registered mobile'
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'OTP generation failed'
    };
  }
}

export async function verifyAadhaarWithOTP(clientId, otp) {
  try {
    // Step 2: Verify OTP
    const verifyResponse = await axios.post(
      `${SUREPASS_BASE_URL}/aadhaar-v2/submit-otp`,
      { 
        client_id: clientId,
        otp: otp 
      },
      {
        headers: {
          'Authorization': `Bearer ${SUREPASS_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      success: true,
      data: verifyResponse.data.data,
      message: 'Aadhaar verified successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'OTP verification failed'
    };
  }
}