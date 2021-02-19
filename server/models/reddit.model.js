module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      project_id: String,
      subscribers: String,
      created: String,
    },
    { timestamps: true }
  );

  schema.plugin(mongoosePaginate);

  const Reddit = mongoose.model("Reddit", schema);
  return Reddit;
};
