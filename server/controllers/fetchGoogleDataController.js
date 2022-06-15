const fs = require('fs');
const fetchGoogleData = async (req, res) => {
  try {
    let fetchData = fs.readFileSync('searchData.json');
    if (fetchData && fetchData.length > 0) {
      fetchData = JSON.parse(fetchData);
      res.send({ code: 200, message: 'success',data:fetchData })
      return
    }else{
      res.send({ code: 206, message: 'no data found',data:[] })
      return
    }
  } catch (error) {
    if (error && error.code) {
      res.send({ code: error.code, message: error.message })
    } else {
      res.send({ code: '', message: error.message })
    }
  }

};


module.exports = {
  fetchGoogleData,
};
