import Log from "db/models/Log";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    // Delete log entry
    const { id } = req.query;
    try {
      await Log.destroy({ where: { id } });

      res.status(200).json({
        message: "Log entry deleted",
      });
    } catch (err) {
      res.status(500).json({
        message: "Error deleting log entry",
        error: err,
      });
    }
  }
}
