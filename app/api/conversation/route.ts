// import {Configuration, OpenAIApi} from "openai";

import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';

import { checkSubscription } from '@/lib/subscription';

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// })

// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export async function POST(
    req: Request,
) {
    try {

        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unathorized", { status: 401 })
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        if (!messages) {
            return new NextResponse("Message are required", { status: 400 });
        }

        // const response = await openai.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     messages
        // })

        // return NextResponse.json(response.data.choices[0].message);

        // checking whether we are on free trial
        const freeTrial = await checkApiLimit();

        const isPro = await checkSubscription();
        

        if(!freeTrial && !isPro ){
            return new NextResponse("Free trial has expired", {status: 403 });
        }
        

        
        

        // New
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        });

        if(!isPro){
            await increaseApiLimit();
        }
        
        //  return new NextResponse(JSON.stringify(response.choices[0].message))  // response.data.choices[0].message
        return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

































