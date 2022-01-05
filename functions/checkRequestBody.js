function checkRequestBody(req) {
    if(Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        return {
            status: 0,
            msg: 'Brak wymaganych parametrów'
        };
    };
    return { status: 1 };
};

module.exports = checkRequestBody;
