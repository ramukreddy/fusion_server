module.exports = {
    findByProjectIdSQL: "select ProjectId,ProjectTitle,ProjectDescription,RegisterToConceptId,ProjectStartDate," +
    " ProjectEndDate, ProjectStatus, ProjectURL " +
    "from Project where ProjectId= ?",
    findByProjectsByUserIdSQL: "select ProjectId,ProjectTitle,ProjectDescription,ProjectStartDate,ProjectEndDate,CreatedBy from Project where CreatedBy = ? ",
    findByProjectsByStudentIdSQL: "select Project.ProjectId,ProjectTitle,ProjectDescription,ProjectStartDate,ProjectEndDate from Project,StudentCohort cohort where cohort.ProjectId = Project.ProjectId and cohort.StudentId = ? "

};                        