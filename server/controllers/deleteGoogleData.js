const fs = require('fs');
const deleteStoredData = async (req, res) => {
  try {
    const deleteData = parseInt(req.params.id)
    let fetchData = fs.readFileSync('searchData.json');
    let checkData = false
    if (fetchData && fetchData.length > 0) {
      var storeDataIntoArray = [];
      var data;
      fetchData = JSON.parse(fetchData);
      var arrayLength = fetchData.length;
      if (fetchData && fetchData.length > 0) {
        storeDataIntoArray = fetchData.filter((item) =>item.id !== deleteData);
      }else{
        res.send({ code: 202, message: 'id not exists' })
        return
      }
      if(arrayLength == storeDataIntoArray.length){
        res.send({ code: 202, message: 'id not exists' })
        return
      }
      data = JSON.stringify(storeDataIntoArray, null, 2)
     
    }else{
      res.send({ code: 202, message: 'no data found' })
      return
    }
    fs.writeFileSync("searchData.json", data);
    res.send({ code: 200, message: 'success' })
    return
  } catch (error) {
    if (error && error.code) {
      res.send({ code: error.code, message: error.message })
    } else {
      res.send({ code: '', message: error.message })
    }
  }

};


module.exports = {
  deleteStoredData,
};
