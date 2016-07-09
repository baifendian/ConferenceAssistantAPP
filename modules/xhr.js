/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule xhr.js
 */
 
function xhr(option) {

  option.url = (xhr.baseUrl || '') + option.url
  option.type = (option.type || 'get').toUpperCase()

  const request = new XMLHttpRequest()

  request.onreadystatechange = () => {
    if (request.readyState !== 4) {
      return
    }
    if (request.status === 200) {
      let response = request.responseText
      if (request.getResponseHeader('Content-Type').indexOf('application/json') !== -1) {
        response = JSON.parse(request.responseText)
      }
      if (xhr.dataFilter) {
        response = xhr.dataFilter(response, option)
      }
      const success = xhr.success || option.success
      success && success(response, option)
    } else {
      const { status, statusText } = request
      const msg = 'Status Code: ' + status + ', ' + statusText
      option.error && option.error(msg)
    }
    option.complete && option.complete()
  }

  request.open(option.type, option.url, true)

  // requestHeader
  if (xhr.header) {
    for (let k in xhr.header) {
      request.setRequestHeader(k, xhr.header[k])
    }
  }

  // sendData
  let sendData = option.data
  if (Object.prototype.toString.call(sendData) === '[object Object]') {
    sendData = []
    const data = option.data
    if (data) {
      for (const k in data) {
        if (typeof data[k] === 'object' && data[k]) {
          data[k] = JSON.stringify(data[k])
        }
        sendData.push(`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
      }
    }
    sendData = sendData.join('&')

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  }

  option.beforeSend && option.beforeSend(request)
  request.send(sendData)
}

export default xhr