module.exports = {
    findByProjectIdSQL: "select ProjectId,ProjectTitle,ProjectDescription,RegisterToConceptId,ProjectStartDate," +
    " ProjectEndDate, ProjectStatus, ProjectURL " +
    "from Project where ProjectId= ?",
    findByProjectsByUserIdSQL: "select ProjectId,ProjectTitle,ProjectDescription,ProjectStartDate,ProjectEndDate,CreatedBy from Project where CreatedBy = ? "



};                        