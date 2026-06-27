declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export const trackLead = (label?: string) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', label ? { content_name: label } : {});
  }
};

export const trackViewContent = (contentName: string, contentCategory = 'Blog') => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', { content_name: contentName, content_category: contentCategory });
  }
};

export const trackContact = () => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Contact');
  }
};
