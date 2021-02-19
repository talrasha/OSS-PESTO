module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      project_id: String,
      created_at: String,
      description: String,
      homepage_url: String,
      is_archived: String,
      is_empty: String,
      is_locked: String,
      open_issue_count: String,
      closed_issue_count: String,
      label_count: String,
      language_count: String,
      loc_count: String,
      license_name: String,
      full_name: String,
      owner_type: String,
      owner_url: String,
      primary_language: String,
      pull_request_count: String,
      pushed_at: String,
      release_count: String,
      stargazer_count: String,
      updated_at: String,
      github_url: String,
      watcher_count: String,
      unique_user_count: String,
	  type_user_count: String,
	  type_organization_count: String,
	  type_bot_count: String,
	  locked_count: String,
	  average_active_time: String,
	  average_closed_time: String,
	  milestone_related_count: String,
	  average_comments: String,
        contributor_count: String,
        documentation: String,
        fork_count: String,
        dependence_packagejson: String,
    },
    {
        timestamps: true,
        versionKey: false
    }
  );

  schema.plugin(mongoosePaginate);

  const Project = mongoose.model("Project", schema);
  return Project;
};
