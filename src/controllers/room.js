const roomSchema = require("../models/room");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Rooms"]
            #swagger.summary = "List Rooms"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    const data = await res.getModelList(roomSchema);
    res.status(200).send({
      error: false,
      data,
      details: await res.getModelListDetails(roomSchema),
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Room"]
            #swagger.summary = "Create Room"
        */
    const data = await roomSchema.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Room"]
            #swagger.summary = "Get Single Room"
        */
    const data = await roomSchema.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Room"]
            #swagger.summary = "Update Room"
        */
    const roomImg = await roomSchema.findOne(
      { _id: req.params.id },
      { _id: 0, image: 1 }
    );

    for (let file of req.files) {
      roomImg.image.push("/uploads/" + file.filename);
    }
    req.body.image = roomImg.image;

    const data = await roomSchema.updateOne({ _id: req.params.id }, req.body);
    res.status(200).send({
      error: false,
      data,
      newData: await roomSchema.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Room"]
            #swagger.summary = "Delete Room"
        */
    const data = await roomSchema.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
