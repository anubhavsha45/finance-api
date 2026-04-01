const User = require("./../models/userModel");
const Record = require("./../models/recordSchema");
const appError = require("./../utils/errorClass");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");

exports.createRecord = catchAsync(async (req, res, next) => {
  const { amount, type, category, note } = req.body;

  if (!amount || !type || !category) {
    return next(
      new appError(
        "Missing required fields that are amount type and category",
        400,
      ),
    );
  }
  const record = await Record.create({
    amount,
    type,
    category,
    note,
    createdBy: req.user._id,
  });

  await record.populate("createdBy", "name email");

  return res.status(201).json({
    status: "success",
    data: {
      record,
    },
  });
});

exports.getRecords = catchAsync(async (req, res, next) => {
  const query = Record.find();

  const features = new APIFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const records = await features.query;

  return res.status(200).json({
    status: "success",
    data: {
      records,
    },
  });
});

exports.updateRecord = catchAsync(async (req, res, next) => {
  const { amount, type, category } = req.body;

  const record = await Record.findById(req.params.recordId);

  if (!record) {
    return next(new appError("There is no record with that id", 400));
  }

  const updatedRecord = await Record.findByIdAndUpdate(
    req.params.recordId,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  return res.status(200).json({
    status: "success",
    data: {
      updatedRecord,
    },
  });
});

exports.analyzeRecords = catchAsync(async (req, res, next) => {
  const stats = await Record.aggregate([
    {
      $facet: {
        totals: [
          {
            $group: {
              _id: "$type",
              total: { $sum: "$amount" },
            },
          },
        ],

        categoryBreakdown: [
          {
            $group: {
              _id: "$category",
              total: { $sum: "$amount" },
            },
          },
          { $sort: { total: -1 } },
        ],

        monthlyTrends: [
          {
            $group: {
              _id: { $month: "$date" },
              total: { $sum: "$amount" },
            },
          },
          { $sort: { _id: 1 } },
        ],
      },
    },
  ]);

  const totals = stats[0].totals;

  let totalIncome = 0;
  let totalExpense = 0;

  totals.forEach((el) => {
    if (el._id === "income") totalIncome = el.total;
    if (el._id === "expense") totalExpense = el.total;
  });

  const netBalance = totalIncome - totalExpense;

  res.status(200).json({
    status: "success",
    data: {
      totalIncome,
      totalExpense,
      netBalance,
      categoryBreakdown: stats[0].categoryBreakdown,
      monthlyTrends: stats[0].monthlyTrends,
    },
  });
});

exports.dashboardView = catchAsync(async (req, res, next) => {
  const stats = await Record.aggregate([
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let totalIncome = 0;
  let totalExpense = 0;

  stats.forEach((el) => {
    if (el._id === "income") totalIncome = el.total;
    if (el._id === "expense") totalExpense = el.total;
  });

  const netBalance = totalIncome - totalExpense;

  res.status(200).json({
    status: "success",
    data: {
      totalIncome,
      totalExpense,
      netBalance,
    },
  });
});
