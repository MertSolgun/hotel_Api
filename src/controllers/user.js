const userSchema = require("../models/usermodel");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["User"]
            #swagger.summary = "List User"
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

    const data = await res.getModelList(userSchema);
    res.status(200).send({
      error: false,
      data,
      details: await res.getModelListDetails(userSchema),
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["User"]
            #swagger.summary = "Create User"
        */

    if (!req.user.isAdmin) {
      req.body.isAdmin = false;
    }

    const data = await userSchema.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["User"]
            #swagger.summary = "Get Single User"
        */

    let filter = {};
    if (!req.user.isAdmin) {
      filter = { _id: req.user._id };
    } else {
      res.errorStatusCode = 403;
      throw new Error("NoPermission");
    }

    // if (req.params.id !== req.user._id.toString()) {
    //   return res.status(403).send({ error: true, message: "No permission" });
    // }

    const data = await userSchema.findOne({ _id: req.params.id, ...filter });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["User"]
            #swagger.summary = "Update User"
        */

    if (!req.user.isAdmin) {
      req.body.isAdmin = false;
    }
    const data = await userSchema.updateOne({ _id: req.params.id }, req.body);
    res.status(200).send({
      error: false,
      data,
      newData: await userSchema.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["User"]
            #swagger.summary = "Delete User"
        */
    const data = await userSchema.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
