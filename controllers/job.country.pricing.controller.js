const jobCountryPricingServices = require("../services/job.country.pricings.services");

const { useAsync } = require("../core");
const { JParser } = require("../core").utils;

exports.index = useAsync(async (req, res, next) => {
  try {
    const all = await jobCountryPricingServices.all(req);

    return res.status(200).json(JParser("ok-response", true, all));
  } catch (error) {
    next(error);
  }
});

exports.store = useAsync(async (req, res, next) => {
  try {
    const { country } = req.body;

    const find = await jobCountryPricingServices.findBy({ country });

    if (find) {
      // create
      return res
        .status(409)
        .json(JParser("pricing already exist", false, find));
    }

    const create = await jobCountryPricingServices.store(req);

    if (create) {
      return res.status(201).json(JParser("ok-response", true, create));
    }
  } catch (error) {
    next(error);
  }
});

exports.get_by_id = useAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const find = await jobCountryPricingServices.findOne(id);

    if (!find) {
      return res.status(404).json(JParser("pricing not found", false, null));
    }

    return res.status(200).json(JParser("ok-response", true, find));
  } catch (error) {
    next(error);
  }
});

exports.update = useAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const price = await jobCountryPricingServices.findOne(id);

    if (!price) {
      return res.status(404).json(JParser("pricing not found", false, null));
    }

    const update = await jobCountryPricingServices.update(id, req);

    if (update) {
      const price = await jobCountryPricingServices.findOne(id);

      return res.status(200).json(JParser("ok-response", true, price));
    }
  } catch (error) {
    next(error);
  }
});

exports.destroy = useAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const price = await jobCountryPricingServices.findOne(id);

    if (!price) {
      return res.status(404).json(JParser("pricing not found", false, null));
    }

    const destroy = await jobCountryPricingServices.destroy(id);

    if (destroy) {
      return res.status(204).json(JParser("ok-response", true, null));
    }
  } catch (error) {
    next(error);
  }
});
