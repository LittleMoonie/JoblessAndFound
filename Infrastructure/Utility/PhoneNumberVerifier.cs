using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PhoneNumbers;

namespace Infrastructure.Utility
{
    public class PhoneNumberVerifier
    {
        private readonly PhoneNumberUtil _phoneNumberUtil;

        public PhoneNumberVerifier()
        {
            _phoneNumberUtil = PhoneNumberUtil.GetInstance();
        }

        /// <summary>
        /// Verifies if the provided phone number is valid for the given country code.
        /// </summary>
        /// <param name="phoneNumber">The phone number to validate (e.g., "+14155552671").</param>
        /// <param name="countryCode">The 2-letter country code (e.g., "US" for United States).</param>
        /// <returns>True if valid, false otherwise.</returns>
        public bool IsPhoneNumberValid(string phoneNumber, string countryCode)
        {
            try
            {
                var parsedPhoneNumber = _phoneNumberUtil.Parse(phoneNumber, countryCode);

                // Check if the number is a possible number and if it is valid
                return _phoneNumberUtil.IsPossibleNumber(parsedPhoneNumber)
                    && _phoneNumberUtil.IsValidNumber(parsedPhoneNumber);
            }
            catch (NumberParseException)
            {
                // NumberParseException is thrown if the number could not be parsed correctly
                return false;
            }
        }

        /// <summary>
        /// Formats a valid phone number into the international format.
        /// </summary>
        /// <param name="phoneNumber">The phone number to format.</param>
        /// <param name="countryCode">The 2-letter country code (e.g., "US").</param>
        /// <returns>Formatted phone number or null if invalid.</returns>
        public string? FormatPhoneNumber(string phoneNumber, string countryCode)
        {
            try
            {
                var parsedPhoneNumber = _phoneNumberUtil.Parse(phoneNumber, countryCode);

                // If the phone number is valid, format it in the international format
                if (_phoneNumberUtil.IsValidNumber(parsedPhoneNumber))
                {
                    return _phoneNumberUtil.Format(
                        parsedPhoneNumber,
                        PhoneNumberFormat.INTERNATIONAL
                    );
                }
            }
            catch (NumberParseException)
            {
                // Handle the exception if the number is not valid
                return null;
            }

            return null;
        }
    }
}
