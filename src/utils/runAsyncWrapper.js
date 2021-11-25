function runAysncWrapper(callback) {
    return function (req, res, next) {
        callback(req, res, next).catch(next);
    };
}

export default runAysncWrapper;
