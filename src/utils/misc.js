export const getPercentageOff=(originalPrice, offerPrice) =>{
    if (originalPrice <= 0) {
      return 0;
    }
  
    const discount = originalPrice - offerPrice;
    const percentageOff = (discount / originalPrice) * 100;
  
    return percentageOff;
  }