export function convertIpfsUrl(url: string) {
  if (url.startsWith("ipfs://")) {
    return "https://ipfs.io/ipfs/" + url.slice(7);
  } else {
    return url;
  }
}
