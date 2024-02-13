import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge"
import express, { Request, Response } from 'express';

const configuration = new Configuration({
  apiKey: "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",
})

const openai=new  OpenAIApi(configuration);


export async function Post(req:Request,res:Response) {
  const { messages } =  req.body;
  
  let chatGptMessages = [
    {
      role: "system",
      content:
        "Sen bir antrenörsün. Spor konusundan başka hiç bir konu konuşamazsın. Sana sorulan soruları bilimsel ve sportif bir şekilde cevaplamalısın.",
    },
    ...messages,
  ];

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages:chatGptMessages,
    stream: true,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
} 

