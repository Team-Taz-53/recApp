
const userQueryController = {}

userQueryController.parseQuery = (req, res, next) => {
    try {
        const { userQuery,location } = req.body;
        
        if (!userQuery && !location) {
            return res.status(400).json({ message: 'User query is required' })
        }
        if (typeof userQuery !== 'string' && typeof location !== 'string') {
            return res.status(400).json({ message: 'User query is not a string' })
        }
        res.locals.parsedQuery = userQuery
        res.locals.parsedLocation = location
        return next();

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }       
}

module.exports = userQueryController