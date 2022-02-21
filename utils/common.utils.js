multipleColumnSet = (object) => {
  if (typeof object !== "object") {
    throw new Error("Invalid input");
  }

  const keys = Object.keys(object);
  const values = Object.values(object);

  columnSet = keys.map((key) => `${key} = ?`).join(" and ");

  return {
    columnSet,
    values,
  };
};
multipleColumnUpdate = (object) => {
  if (typeof object !== "object") {
    throw new Error("Invalid input");
  }

  const keys = Object.keys(object);
  const values = Object.values(object);

  columnSet = keys.map((key) => `${key} = ?`).join(" , ");

  return {
    columnSet,
    values,
  };
};
module.exports = { multipleColumnSet, multipleColumnUpdate };
