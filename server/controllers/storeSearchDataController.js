const fs = require('fs');
const storeSearchData = async (req, res) => {
  try {
    const searchData = req.body;
    let fetchData = fs.readFileSync('searchData.json');
    if (fetchData && fetchData.length > 0) {
      var storeDataIntoArray = [];
      var data;
      fetchData = JSON.parse(fetchData);
      if (fetchData && fetchData.length > 0) {
        fetchData.forEach(element => {
          storeDataIntoArray.push(element)
        });
      }else{
        res.send({ code: 205, message: 'data format stored into db is worng'})
        return
      }
      storeDataIntoArray.push(searchData)
      data = JSON.stringify(storeDataIntoArray, null, 2)
    } else {
      data = JSON.stringify([searchData], null, 2)

    }
    fs.writeFileSync("searchData.json", data);
    res.send({ code: 200, message: 'success', data: searchData })
  } catch (error) {
    if (error && error.code) {
      res.send({ code: error.code, message: error.message })
      return
    } else {
      res.send({ code: '', message: error.message })
      return
    }
  }

};


module.exports = {
  storeSearchData,
};
