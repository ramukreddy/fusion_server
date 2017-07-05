module.exports = {
    findConceptByConceptId: "select ConceptId, ConceptTitle,ConceptDescription,ConceptType,ConceptFromDate," +
    " ConceptToDate, ConceptOpenToInstitution, ConceptOpenToAnyLocation," +
    "ConceptStatus,ConceptMaxParticipants, CompanyId,ConceptCreatedBy " +
    "from Concept where ConceptId= ?",
    getAllConceptsSQL: "select Concept.ConceptId, ConceptTitle,ConceptDescription,ConceptType,ConceptFromDate," +
    " ConceptToDate, ConceptOpenToInstitution, ConceptOpenToAnyLocation," +
    " ConceptStatus,ConceptMaxParticipants, CompanyId,ConceptCreatedBy " +
    " from Concept,RegisterToConcept where ConceptOpenToInstitution='1' " +
    " and Concept.ConceptId= RegisterToConcept.ConceptId " +
    " and RegisterToConcept.TeacherId !=?",

    getRegisteredConcepts: "select Concept.ConceptId, ConceptTitle,ConceptDescription,ConceptType,ConceptFromDate," +
    " ConceptToDate, ConceptOpenToInstitution, ConceptOpenToAnyLocation," +
    " ConceptStatus,ConceptMaxParticipants, CompanyId,ConceptCreatedBy " +
    " from Concept,RegisterToConcept where ConceptOpenToInstitution='1' " +
    " and Concept.ConceptId= RegisterToConcept.ConceptId " +
    " and RegisterToConcept.TeacherId=?"
};                        