/**
 * @Description: 
 * @Author: gcz
 * @Date: 2023-02-23 10:02:20
 * @LastEditors: gcz
 * @LastEditTime: 2023-02-23 10:10:22
 * @FilePath: \chatNode\routes\openaiRoutes.js
 * @Copyright: Copyright (c) 2016~2023 by gcz, All Rights Reserved. 
 */
const express = require('express');
const router = express.Router();

const { openaiChat,generateImage,openaiCode,turboChat,getBalance } = require('../controller/openaiController');

router.get('/', function(req, res, next) {
  res.send({
      code:200,
      data:'成功'
  })
});

router.post('/chat',openaiChat)
router.post('/generateImage',generateImage)
router.post('/openaiCode',openaiCode)
router.post('/turboChat',turboChat)
router.post('/getBalance',getBalance)

module.exports = router