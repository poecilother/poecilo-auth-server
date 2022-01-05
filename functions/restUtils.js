module.exports = {
  responseStatus: {
    // 200
    OK: (message, data) => { return response(200, message, data) },
    CREATED: (message, data) => { return response(201, message, data) },
    // 400
    BAD_REQUEST: (message, data) => { return response(400, message, data) },
    UNAUTHORIZED: (message, data) => { return response(401, message, data) },
    FORBIDDEN: (message, data) => { return response(403, message, data) },
    NOT_FOUND: (message, data) => { return response(404, message, data) },
    CONFLICT: (message, data) => { return response(409, message, data) },
    // 500
    INTERNAL_SERVER: (message, data) => { return response(500, message, data) },
  },
};

function response(status, message, data) {
  return { status, message, data };
};
