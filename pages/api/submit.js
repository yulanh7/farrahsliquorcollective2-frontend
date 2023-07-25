export default function handler(req, res) {
  if (req.method === "POST") {
    const { blocks, business, website, sales, lead, server, ticket } = req.body;

    // Perform any necessary validation or data processing here

    // Example response
    const response = {
      success: true,
      message: "Data submitted successfully",
      data: {
        blocks,
        business,
        website,
        sales,
        lead,
        server,
        ticket,
      },
    };

    res.status(200).json(response);
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
