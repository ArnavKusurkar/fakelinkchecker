// fakeLinkDetector.js
function fakeLinkDetector(link) {
    const phishingKeywords = ['login', 'password', 'account', 'verify', 'bank', 'paypal', 'secure'];
    const containsPhishingKeyword = phishingKeywords.some(keyword => link.includes(keyword));
    const unusualFormat = link.length > 50 || /[0-9a-f]{32}/.test(link);
  
    if (containsPhishingKeyword || unusualFormat) {
      return 'Potentially fake or malicious link';
    } else {
      return 'Link appears to be safe';
    }
  }
  
  module.exports = fakeLinkDetector;
  