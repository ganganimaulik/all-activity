import Log from "db/models/Log";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Create log entry
    const { description, startDateTime, endDateTime } = req.body;

    const log = new Log({
      description,
      startDateTime,
      endDateTime,
    });

    try {
      await log.save();
      res.status(200).json({
        message: "Log entry created",
      });
    } catch (err) {
      res.status(500).json({
        message: "Error creating log entry",
        error: err,
      });
    }
  } else if (req.method === "GET") {
    let page = +req.query.page + 1 || 1;
    let limit = +req.query.pageSize || 10;

    // Get all log entries for server side pagination
    try {
      let logs = await Log.findAll({
        offset: (page - 1) * limit,
        limit,
        subQuery: false,
        order: [["startDateTime", "DESC"]],
      });
      res.status(200).json({
        total: await Log.count(),
        data: logs,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error finding log entries",
        error: err,
      });
    }
  }
}
