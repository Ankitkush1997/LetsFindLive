const fs = require('fs');
const deleteStoredData = async (req, res) => {
  try {
    let id  = req.query.id
    let pageName = req.query.pageName
    if(!pageName){
      res.send({ code: 202, message: 'page name invalid' })
      return
    }
    if(!id){
      res.send({ code: 202, message: 'id invalid' })
      return
    }
    let isExists = fs.existsSync(__dirname + `/../db/${pageName}.json`)
      if(!isExists){
        res.send({ code: 211, message: 'page not found', data: [] })
        return
      }
    let fetchData = fs.readFileSync(__dirname + `/../db/${pageName}.json`);
    if (fetchData && fetchData.length > 0) {
      var storeDataIntoArray = [];
      var data;
      fetchData = JSON.parse(fetchData);
      var arrayLength = fetchData.length;
      if (fetchData && fetchData.length > 0) {
        storeDataIntoArray = fetchData.filter((item) =>item.id !== id);
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
    fs.writeFileSync(__dirname + `/../db/${pageName}.json`, data);
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
