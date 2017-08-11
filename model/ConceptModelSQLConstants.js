module.exports = {
    findConceptByConceptId: "select ConceptId, ConceptTitle,ConceptDescription,ConceptType,ConceptFromDate," +
    " ConceptToDate, ConceptOpenToInstitution, ConceptOpenToAnyLocation," +
    "ConceptStatus,ConceptMaxParticipants, CompanyId,ConceptCreatedBy " +
    "from Concept where ConceptId= ?",
    getAllConceptsSQL: "select Concept.ConceptId, ConceptTitle,ConceptDescription,ConceptType,ConceptFromDate," +
    " ConceptToDate, ConceptOpenToInstitution, ConceptOpenToAnyLocation," +
    " ConceptStatus,ConceptMaxParticipants, CompanyId,ConceptCreatedBy " +
    " from Concept left outer join RegisterToConcept on Concept.ConceptId= RegisterToConcept.ConceptId" +
    " where ConceptOpenToInstitution='1' ",

    getRegisteredConcepts: "select Concept.ConceptId, ConceptTitle,ConceptDescription,ConceptType,ConceptFromDate," +
    " ConceptToDate, ConceptOpenToInstitution, ConceptOpenToAnyLocation," +
    " ConceptStatus,ConceptMaxParticipants, CompanyId,ConceptCreatedBy " +
    " from Concept,RegisterToConcept where ConceptOpenToInstitution='1' " +
    " and Concept.ConceptId= RegisterToConcept.ConceptId " +
    " and RegisterToConcept.TeacherId=?",

    getUniversitiesForRegisteredConceptSQL: "select distinct College.* from Concept, " +
    "College,CollegeDepartment,User_Department_Mapping,User,RegisterToConcept " +
    "Left join Project ON RegisterToConcept.RegisterToConceptId =  Project.RegisterToConceptId " +
    "where RegisterToConcept.ConceptId = Concept.ConceptId " +
    "and User_Department_Mapping.CollegeDepartmentId=CollegeDepartment.CollegeDepartmentId "+
    "and User_Department_Mapping.TeacherId = RegisterToConcept.TeacherId "+
    "and College.CollegeId=CollegeDepartment.CollegeId " +
    "and User.UserId = RegisterToConcept.TeacherId and Concept.ConceptId=?",

    getProjectsForConceptAndCollege: "select distinct College.* from Concept, " +
    "College,CollegeDepartment,User_Department_Mapping,User,RegisterToConcept " +
    "Left join Project ON RegisterToConcept.RegisterToConceptId =  Project.RegisterToConceptId " +
    "where RegisterToConcept.ConceptId = Concept.ConceptId " +
    "and User_Department_Mapping.CollegeDepartmentId=CollegeDepartment.CollegeDepartmentId "+
    "and User_Department_Mapping.TeacherId = RegisterToConcept.TeacherId "+
    "and College.CollegeId=CollegeDepartment.CollegeId " +
    "and User.UserId = RegisterToConcept.TeacherId and Concept.ConceptId=? and College.CollegeId=?"
};                        