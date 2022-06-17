const fs = require('fs');

const getPageData = async (req, res) => {
  try {
    try {
      let pageName = req.params.pageName
      if(!pageName){
        res.send({ code: 211, message: 'page not found', data: [] })
        return
      }
      let isExists = fs.existsSync(__dirname + `/../db/${pageName}.json`)
      if(!isExists){
        res.send({ code: 211, message: 'page not found', data: [] })
        return
      }
      let fetchData = fs.readFileSync(__dirname + `/../db/${pageName}.json`)
      if (fetchData && fetchData.length > 0) {
        fetchData = JSON.parse(fetchData);
        res.send({ code: 200, message: 'success',data:fetchData })
        return
      }else{
        res.send({ code: 206, message: 'no data found',data:[] })
        return
      }
    } catch (error) {
      res.send({ code: 200, message: 'success', data: error })
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
  getPageData
};
