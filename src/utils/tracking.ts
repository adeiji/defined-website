export const trackConversion = (conversionId: string, phoneNumber?: string, email?: string) => {
    // Access the gtag_report_conversion function from window
    if (typeof window !== 'undefined' && window.gtag_report_conversion) {
        window.gtag_report_conversion(undefined, conversionId);
    }

    // Microsoft Conversion Tracking
    // Add this script right after your base UET tag code
   window.uetq = window.uetq || [];
   window.uetq.push('set', { 'pid': { 
      'em': email ?? "", // Replace with the variable that holds the user's email address. 
      'ph': phoneNumber ?? "", // Replace with the variable that holds the user's phone number. 
   } });
};