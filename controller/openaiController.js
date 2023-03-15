/**
 * @Description: 
 * @Author: gcz
 * @Date: 2023-02-23 10:07:10
 * @LastEditors: gcz
 * @LastEditTime: 2023-02-23 10:43:44
 * @FilePath: \chatNode\controller\openaiController.js
 * @Copyright: Copyright (c) 2016~2023 by gcz, All Rights Reserved. 
 */
//  https://www.bilibili.com/read/cv20460859
const { Configuration, OpenAIApi } = require("openai");

const request = require('request');



const openaiChat = async (req,res) =>{
    const {prompt,apiKey} = req.body;
    const configuration = new Configuration({
	  apiKey: apiKey||process.env.OPENAI_API_KEY,
	});
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",//davinci text-davinci-003 gpt-3.5-turbo
            prompt,
            temperature: 0.9,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            // stop: ['None'],
            // stop: ["input:"],
            // stop: ["{}"],
            // stop: [" Human:", " AI:"],
        });
        // console.log('response.data',response.data)
        
        // let data = response.data.choices[0].text;
        // if (typeof data === "object") {
        //     console.log("Data is in JSON format");
        //     let jsonData = JSON.parse(data); 
        //     // let markdown = marked(jsonData);
        // } else if (typeof data === "string") {
        //     console.log("Data is in XML or HTML format");
        //     // let markdown = marked(data);
        // }

        res.status(200).json({ 
            success:true,
            data:response.data.choices[0].text
         }); 
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
        console.log('error',error)
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
            error: {
            message: 'An error occurred during your request.',
            }
        });
        }
    }
}

const turboChat = async (req,res) =>{
    const {messages,apiKey} = req.body;
    let key = apiKey||process.env.OPENAI_API_KEY;
//    console.log('key',key)
	const configuration = new Configuration({
	  apiKey: apiKey||process.env.OPENAI_API_KEY,
	});
    const openai = new OpenAIApi(configuration);
//    console.log('messages',messages)
    try {
        const response = await openai.createChatCompletion({//openai.ChatCompletion.create  openai.createCompletion
            model: "gpt-3.5-turbo",//davinci text-davinci-003 gpt-3.5-turbo
            messages:messages,
            // prompt,
            // temperature: 0.9,
            // max_tokens: 1000,
            // top_p: 1,
            // frequency_penalty: 0.0,
            // presence_penalty: 0.6,
            // stop: [" Human:", " AI:"],
        });
//        console.log('response',response.data.choices[0])
        res.status(200).json({ 
            success:true,
            data:response.data.choices[0].message.content,
            usage:response.data.usage
         }); 
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
        console.log('error',error)
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
            error: {
            message: 'An error occurred during your request.',
            }
        });
        }
    }
}

const generateImage = async (req,res) =>{
    const { prompt,size,apiKey } = req.body;
    const imageSize = size === 'small' ? '256x256' : size ==='medium' ? '512x512' : '1024x1024';
    const configuration = new Configuration({
	  apiKey: apiKey||process.env.OPENAI_API_KEY,
	});
    const openai = new OpenAIApi(configuration);
    try {
        const  response = await openai.createImage({
            prompt,
            n:1,
           size:imageSize
        });
        const imageUrl = response.data.data[0].url;
        res.status(200).json({ 
            success:true,
            data:imageUrl
        }); 
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        }
        res.status(400).json({
            success:false,
            error:'生成失败'
        });
    }
}

const openaiCode = async (req,res) =>{
    const {prompt} = req.body;
    try {
        const response = await openai.createCompletion({
            model: "code-davinci-002",//
            prompt,
            temperature: 0,
            max_tokens: 2000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
        });
        // console.log('response.data',response.data)
        res.status(200).json({ 
            success:true,
            data:response.data.choices[0].text
         }); 
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
            error: {
            message: 'An error occurred during your request.',
            }
        });
        }
    }
}

const getBalance = async (req,res) =>{
    const {apiKey} = req.body;
//    console.log('apiKey',apiKey)
    console.log('request',request)
    const options = {
	  url: 'https://api.openai.com/dashboard/billing/credit_grants',  // chatgpt接口URL
	  headers: {
	    'Authorization': 'Bearer '+ apiKey,     // 替换为自己的key
	    'Content-Type': 'application/json'
	  }
	};
	 
	const response = await request(options, (err, requestres, body) => {
//		console.log('res',res)
//		console.log('body',body)
	  if (err) {
	  	res.status(500).json({
            error: {
            message: 'An error occurred during your request.',
            }
        });
	  	console.error(err); return; 
	  }   // 错误处理
		res.status(200).json({ 
            success:true,
            data:JSON.parse(body)
         });
//	  console.log(JSON.parse(body));             // 输出结果，此处为余额信息  
	});
}

module.exports = { openaiChat,generateImage,openaiCode,turboChat,getBalance }