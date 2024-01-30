export const validateIPAddress = (ip: string) => {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i;
  if (ipv4Regex.test(ip)) {
    const parts = ip.split('.');
    for (let part of parts) {
      if (parseInt(part) > 255) {
        return false;
      }
    }
    return true;
  }
  if (ipv6Regex.test(ip)) {
    const parts = ip.split(':');
    for (let part of parts) {
      if (part.length > 4) {
        return false;
      }
    }
    return true;
  }
  return false;
};
