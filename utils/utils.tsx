export const getHash = async (
  firstName: string,
  lastName: string,
  email: string,
  dob: string
) => {
  const data = `${firstName}${lastName}${email}${dob}`;
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', encodedData);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}