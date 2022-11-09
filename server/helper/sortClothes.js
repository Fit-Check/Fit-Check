

const sortClothes = (clothesArray) => {
  const sorted = {
    top: [],
    bottom: []
  };
  clothesArray.forEach(clotheObj => {
    sorted[clotheObj.type].push(clotheObj);
  });

  return sorted;
};

export {sortClothes};