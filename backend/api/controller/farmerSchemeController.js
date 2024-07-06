const farmerData = require('../../farmerSchemeData');

exports.farmerScheme = (req, res) => {
    try {
        console.log(farmerData);
        res.status(200).json({ status: 200, message: farmerData });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};
