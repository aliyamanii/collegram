export default function getTagCollor(tag: string) {
  const colors = [
    "#fe4a49",
    "#2ab7ca",
    "#fed766",
    "#ffa700",
    "#dec3c3",
    "#54b2a9",
    "#f37736",
    "#00aedb",
  ];

  const hashedToNumber = tag.split("").reduce((number, char) => {
    return number + char.charCodeAt(0);
  }, 0);
  return colors[hashedToNumber % colors.length];
}
