import otpGen from 'otp-generator'

export function generateOTP(): string {
    return otpGen.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
}