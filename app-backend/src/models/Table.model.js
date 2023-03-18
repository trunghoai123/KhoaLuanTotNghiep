const { model, Schema } = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const COLLECTION_NAME = "Ban";
const DOCUMENT_NAME = "Ban";

const tableSchema = new Schema(
  {
    SoThuTuBan: {
      type: Number,
      required: true,
    },
    TrangThai: {
      type: Number,
    },
    SoChoNgoi: {
      type: Number,
    },
    MaKhuVuc: {
      type: Schema.Types.ObjectId,
      ref: "KhuVuc",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, tableSchema);
