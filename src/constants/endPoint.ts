const ROUTES = {
  auth: {
    LOGIN: `/api/v1/auth/login`,
    CHANGE_PASSWORD: `/api/v1/auth/change-password`,
    PASSWORD_RESET_MAIL: `/api/v1/auth/send-reset-password-email`,
    RESET_PASSWORD: `/api/v1/auth/reset-password/:id/:token`,
  },

  CANDIDATE: `/api/v1/management/candidate-details/:id`,
  CREATE_CANDIDATE: `/api/v1/management/create-candidate`,
  DELETE_CANDIDATE: `/api/v1/management/delete-candidate/:id`,
  UPDATE_CANDIDATE: `/api/v1/management/update-candidate/:id`,

  QUESTION: `/api/v1/management/question/:id`,
  QUESTION_PAGINATE: `/api/v1/management/paginate-questions`,
  CREATE_QUESTION: `/api/v1/management/create-question`,
  UPDATE_QUESTION: `/api/v1/management/update-question/:id`,
  DELETE_QUESTION: `/api/v1/management/delete-question/:id`,

  COLLEGE: `/api/v1/management/college/:id`,
  COLLEGES: `/api/v1/management/colleges`,
  COLLEGE_PAGINATE: `/api/v1/management/paginate-colleges`,
  CREATE_COLLEGE: `/api/v1/management/create-college`,
  UPDATE_COLLEGE: `/api/v1/management/update-college/:id`,
  DELETE_COLLEGE: `/api/v1/management/delete-college/:id`,

  CREATE_REJOIN_LINK: `/api/v1/management/create-rejoin-link`,
  DOWNLOAD: `/api/v1/management/resume-download/:id`,
  FILTER: `/api/v1/management/filter-candidate-details`,
};

export default ROUTES;
