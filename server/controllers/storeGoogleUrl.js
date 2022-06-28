const fs = require('fs');

const URLList = async (req, res) => {
  try {
    try {
      let fetchData = fs.readdirSync(__dirname + `/../db`, { withFileTypes: false })
      var urlData = [];
      if (fetchData && fetchData.length > 0) {
        for (let i = 0; i < fetchData.length; i++) {
          let aa = fetchData[i].split(".")
          urlData.push(aa[0])
        }
      }
      res.send({ code: 200, message: 'success', data: urlData })
      return
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
const storeUrls = async (req, res) => {
  try {
    let url = req.params.url;
    if (!url) {
      res.send({ code: 206, message: 'please add url', data: [] })
      return
    }
    let checkValiadtion = await validation(url)
    if (checkValiadtion == false) {
      res.send({ code: 210, message: 'url already exists', data: {} })
      return
    }
    try {
      fs.writeFileSync(__dirname + `/../db/${url}.json`, '')
    } catch (error) {
      res.send({ code: 200, message: 'success', data: error })
      return
    }
    res.send({ code: 200, message: 'success', data: '' })
    return
  } catch (error) {
    if (error && error.code) {
      res.send({ code: error.code, message: error.message })
    } else {
      res.send({ code: '', message: error.message })
    }
  }

};

const deleteURLS = async (req, res) => {
  try {
    let url = req.params.url;
    if (!url) {
      res.send({ code: 206, message: 'please add url', data: [] })
      return
    }
    let isExists = fs.existsSync(__dirname + `/../db/${url}.json`)
      if(!isExists){
        res.send({ code: 211, message: 'file not found', data: [] })
        return
      }
    try {
      fs.unlinkSync(__dirname + `/../db/${url}.json`, '')
    } catch (error) {
      res.send({ code: 200, message: 'success', data: error })
      return
    }
    res.send({ code: 200, message: 'success', data: '' })
    return
  } catch (error) {
    if (error && error.code) {
      res.send({ code: error.code, message: error.message })
    } else {
      res.send({ code: '', message: error.message })
    }
  }

};


async function validation(url) {
  try {
    let fetchData = fs.readdirSync(__dirname + `/../db`, { withFileTypes: false })
    if (fetchData && fetchData.length > 0) {
      for (let i = 0; i < fetchData.length; i++) {
        let aa = fetchData[i].split(".")
        if (url == aa[0]) {
          return false
        }
      }
    }
    return true
  } catch (error) {
  }
}



const cloneURL = async (req, res) => {
  try {
    let previousURL = req.query.previousURL;
    let newsURL = req.query.newsURL;
    if (!previousURL) {
      res.send({ code: 206, message: 'please add previous url', data: [] })
      return
    }
    if (!newsURL) {
      res.send({ code: 206, message: 'please add new url', data: [] })
      return
    }
    let isPreviousURLExists = fs.existsSync(__dirname + `/../db/${previousURL}.json`)
      if(!isPreviousURLExists){
        res.send({ code: 211, message: 'previous url page not found', data: [] })
        return
      }
      let isNewURLExists = fs.existsSync(__dirname + `/../db/${newsURL}.json`)
      if(isNewURLExists){
        res.send({ code: 211, message: 'new url page already exists', data: [] })
        return
      }
    try {
      let fetchDataFromPreviousFile = fs.readFileSync(__dirname + `/../db/${previousURL}.json`)
       fs.copyFileSync(__dirname + `/../db/${previousURL}.json`,__dirname + `/../db/${newsURL}.json`)
      // if (fetchDataFromPreviousFile && fetchDataFromPreviousFile.length > 0) {
      //   fs.writeFileSync(__dirname + `/../db/${newsURL}.json`, fetchDataFromPreviousFile)
      // }else{
      //   res.send({ code: 206, message: 'no data found in previous url page',data:[] })
      //   return
      // }
    } catch (error) {
      res.send({ code: 200, message: 'success', data: error })
      return
    }
    res.send({ code: 200, message: 'success', data: '' })
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
  storeUrls,
  deleteURLS,
  URLList,
  cloneURL
};
