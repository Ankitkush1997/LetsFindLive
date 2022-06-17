const fs = require('fs');
const storePageData = async (req, res) => {
  try {
    let pageName = req.body.pageName
    let id =  req.body.id
    if (!pageName) {
      res.send({ code: 205, message: 'page name invalid' })
      return
    }
    delete req.body.pageName
    const searchData = req.body;
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
      var storeDataIntoArray = [];
      var data;
      fetchData = JSON.parse(fetchData);
      if (fetchData && fetchData.length > 0) {
        fetchData.forEach(element => {
          storeDataIntoArray.push(element)
        });
      } else {
        res.send({ code: 205, message: 'data format stored into db is worng' })
        return
      }
      storeDataIntoArray.push(searchData)
      data = JSON.stringify(storeDataIntoArray, null, 2)
    } else {
      data = JSON.stringify([searchData], null, 2)
    }
    fs.writeFileSync(__dirname + `/../db/${pageName}.json`, data);
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
  storePageData,
};
