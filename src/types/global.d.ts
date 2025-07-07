// Global type declarations
declare module 'react-livechat';

// Microsoft UET tracking
interface Window {
  uetq: any[];
  gtag_report_conversion: (url?: string, conversionId?: string) => void;
}