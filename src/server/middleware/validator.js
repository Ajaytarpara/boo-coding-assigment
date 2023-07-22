
const joiValidation = async (request, response, schema, next) => {
    try {
        let res;
        let req = request;
        if (schema.query && Object.keys(schema.query).length > 0) {
            res = schema.query.validate(req.query);
        }
        if (schema.params && Object.keys(schema.params).length > 0) {
            res = schema.params.validate(req.params);
        }
        if (schema.body && Object.keys(schema.body).length > 0) {
            res = schema.body.validate(req.body);
        }
        if (schema.headers && Object.keys(schema.headers).length > 0) {
            res = schema.validate(req.headers);
        }
        if (schema.formData && Object.keys(schema.formData).length > 0) {
            res = schema.validate(schema.formData);
        }
        if (res?.error) {
            console.error(
                '🚀 ~ file: validator.js ~ RequestValidator ~ joiValidation ~ res:',
                res.error
            );
            return response.validationError({ message: res.error.message, data: res.error });
        }
        next();
    } catch (err) {
        return response.badRequest({ message: err.message });
    }
}

module.exports = joiValidation;
