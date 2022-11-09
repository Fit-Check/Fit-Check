
const { sortClothes } = require('../server/helper/sortClothes');

describe('sortClothes test', ()=>{
    const clothesArr = []
    const emptyArr = [];
    const newTop = {
        name: 'shirt',
        type: 'top',
        weather: 'cool'
    }
    const newBottom = {
        name: 'jeans',
        type: 'bottom',
        weather: 'cool'
    }
    
        clothesArr.push(newBottom);
        clothesArr.push(newTop);
    
    
    it('Sorts clothes into new array', () => {
        const sorted = sortClothes(clothesArr);
        expect(sorted.top.length).toBe(1);
        expect(sorted.top[0].name).toEqual("shirt");
        expect(sorted.bottom[0].name).toEqual('jeans')
    })
    
})