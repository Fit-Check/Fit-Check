const sortClothes = (clothesArray) => {
  const sorted = {
    top: [],
    bottom: [],
  };
  clothesArray.forEach((clothesObj) => {
    sorted[clothesObj.type].push(clothesObj);
  });

  return sorted;
};

export { sortClothes };
