const sendMail = require("../helper/sendMail");
const reserVationSchema = require("../models/reservation");
const usermodel = require("../models/usermodel");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Reservation"]
            #swagger.summary = "List Reservation "
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
    const data = await res.getModelList(reserVationSchema, {}, [
      "userId",
      "roomId",
    ]);
    res.status(200).send({
      error: false,
      data,
      details: await res.getModelListDetails(reserVationSchema),
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Reservation"]
            #swagger.summary = "Create Reservation"
        */
    const { roomId, arrival_date, departure_date } = req.body;

    const sameReservation = await reserVationSchema.findOne({
      roomId: roomId,
      $or: [
        {
          arrival_date: { $lte: departure_date },
          departure_date: { $gte: arrival_date },
        },
      ],
    });
    if (sameReservation) {
      return res.status(409).send({
        error: true,
        message:
          "Room is already is booked for these dates You can choose our different rooms ",
      });
    }

    const data = await reserVationSchema.create(req.body);
    const data2 = await usermodel.findOne({ _id: data.userId });

    sendMail(
      data2.email, //gonderilcek email
      "Rezervasyon oluşturuldu.",
      "<p>Golden Hill Hotel</p>"
    );
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
            #swagger.tags = ["Reservation"]
            #swagger.summary = "Get Single Reservation"
        */
    let filter = {};
    if (!req.user.isAdmin) {
      filter = { userId: req.user._id };
    }

    const data = await reserVationSchema
      .findOne({
        _id: req.params.id,
        ...filter,
      })
      .populate(["userId", "roomId"]);
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
            #swagger.tags = ["Reservation"]
            #swagger.summary = "Update Reservation"
        */
    const data = await reserVationSchema.updateOne(
      { _id: req.params.id },
      req.body
    );
    res.status(200).send({
      error: false,
      data,
      newData: await reserVationSchema.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
            #swagger.tags = ["Reservation"]
            #swagger.summary = "Delete Reservation"
        */
    const data = await reserVationSchema.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
