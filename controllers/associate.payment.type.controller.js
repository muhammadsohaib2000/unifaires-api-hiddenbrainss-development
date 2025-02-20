const associatePaymentTypeServices = require("../services/associate.payment.type.services");
const { useAsync } = require("../core");
const { JParser } = require("../core/core.utils");

exports.index = useAsync(async (req, res, next) => {
  try {
    const all = await associatePaymentTypeServices.all();

    return res.status(200).send(JParser("ok-response", true, all));
  } catch (error) {
    next(error);
  }
});

exports.store = useAsync(async (req, res, next) => {
  try {
    const create = await associatePaymentTypeServices.store(req);

    return res.status(200).send(JParser("ok-response", true, create));
  } catch (error) {
    next(error);
  }
});

exports.get_by_id = useAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const find = await associatePaymentTypeServices.findOne(id);

    if (find) {
      return res.status(500).send(JParser("ok-response", true, find));
    } else {
      return res.status(404).send(JParser("no payment type", false, null));
    }
  } catch (error) {
    next(error);
  }
});

exports.update = useAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const find = await associatePaymentTypeServices.findOne(id);

    if (find) {
      const update = await associatePaymentTypeServices.update(id, req);

      if (update) {
        const find = await associatePaymentTypeServices.findOne(id);

        return res.status(200).json(JParser("updated!", true, find));
      }
    } else {
      return res.status(404).send(JParser("not found!", false, null));
    }
  } catch (error) {
    next(error);
  }
});

exports.destroy = useAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const destroy = await associatePaymentTypeServices.destroy(id);

    if (destroy) {
      return res.status(204).send(JParser("ok-response", true, null));
    } else {
      return res.status(404).send(JParser("not found", false, null));
    }
  } catch (error) {
    next(error);
  }
});
