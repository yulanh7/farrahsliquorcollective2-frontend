import { NextApiHandler } from "next";

const offers: NextApiHandler = (req, res) => {
  const currentDate = new Date();
  const getRandomDays = () => Math.floor(Math.random() * 10) + 1;
  // Generate random number of likes between 0 and 100
  const getRandomLikes = () => Math.floor(Math.random() * 100);
  // Generate random number of downloads between 0 and 500
  const getRandomDownloads = () => Math.floor(Math.random() * 500);

  // Generate data for all tables
  const mockData = [];
  for (let i = 0; i < 30; i++) {
    const business = `Business ${i + 1}`;
    const offer = `Offer ${i + 1}`;
    const detail = `Details about Offer ${i + 1}`;
    const optLink = `https://example.com/offers/${i + 1}`;
    const createdTime = new Date(
      currentDate.getTime() - getRandomDays() * 24 * 60 * 60 * 1000
    );
    const likes = getRandomLikes();
    const downloads = getRandomDownloads();

    mockData.push({
      id: generateCustomId(),
      business,
      offer,
      detail,
      optLink,
      createdTime,
      likes,
      downloads,
    });
  }

  res.status(200).json(mockData);
};

let idCounter = 0;
function generateCustomId(): string {
  const prefix = "ID";
  const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomPart = Array.from(Array(4))
    .map(() => randomChars[Math.floor(Math.random() * randomChars.length)])
    .join("");

  const uniqueId = `${prefix}-${idCounter
    .toString()
    .padStart(2, "0")}-${randomPart}`;
  idCounter++;

  return uniqueId;
}

export default offers;
