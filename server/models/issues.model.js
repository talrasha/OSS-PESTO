module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      project_id: String,
      issue_count: String,
      unique_user_count: String,
      type_user_count: String,
      type_organization_count: String,
      type_bot_count: String,
      open_count: String,
      closed_count: String,
      locked_count: String,
      average_active_time: String,
      average_closed_time: String,
      milestone_related_count: String,
      average_comments: String,
      pull_request_count: String,
    },
    { timestamps: true }
  );

  schema.plugin(mongoosePaginate);

  const Issues = mongoose.model("Issues", schema);
  return Issues;
};
