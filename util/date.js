const dateFormat = require('dateformat');

module.exports = {

  dateNowFormated() {
    return dateFormat(Date.now(), "isoDateTime").substring(0,19);
  },

  dateNowPlusHourFormated(hour){
    return dateFormat(Date.now() + ((hour*60*60)*1000), "isoDateTime").substring(0,19);
  }
};