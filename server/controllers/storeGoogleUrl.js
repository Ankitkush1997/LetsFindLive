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

module.exports = {
  storeUrls,
  deleteURLS,
  URLList
};
