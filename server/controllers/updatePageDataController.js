const fs = require('fs');
const updatePageData = async (req, res) => {
  try {
    let id = req.body.id
    let pageName = req.body.pageName
    delete req.body.pageName
    if (!pageName) {
      res.send({ code: 202, message: 'page name invalid' })
      return
    }
    if (!id) {
      res.send({ code: 202, message: 'id invalid' })
      return
    }
    let isExists = fs.existsSync(__dirname + `/../db/${pageName}.json`)
    if (!isExists) {
      res.send({ code: 211, message: 'page not found', data: [] })
      return
    }
    let fetchData = fs.readFileSync(__dirname + `/../db/${pageName}.json`);
    if (fetchData && fetchData.length > 0) {
      fetchData = JSON.parse(fetchData);
      let checkDataExists = false
      for (let i = 0; i < fetchData.length; i++) {
        if (fetchData[i].id === id) {
          fetchData[i] = req.body
          checkDataExists = true
        }
      }
      if (checkDataExists == false){
        res.send({ code: 205, message: 'data not matched for update',data:req.body })
        return
      }
      let data = JSON.stringify(fetchData, null, 2)
      fs.writeFileSync(__dirname + `/../db/${pageName}.json`, data);
      res.send({ code: 200, message: 'data successfully updated', data: {} })
    } else {
      res.send({ code: 205, message: 'No data exists' })
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
  updatePageData,
};
