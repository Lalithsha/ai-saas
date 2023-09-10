// import {Configuration, OpenAIApi} from "openai";

import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// })

// const openai = new OpenAIApi(configuration);

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export async function POST(
    req: Request,
) {
    try {

        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "512x512" } = body;

        if (!userId) {
            return new NextResponse("Unathorized", { status: 401 })
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }

        if (!prompt) {
            return new NextResponse("Prompt are required", { status: 400 });
        }

        if (!amount) {
            return new NextResponse("Amount are required", { status: 400 });
        }

        if (!resolution) {
            return new NextResponse("Resolution are required", { status: 400 });
        }

        // checking whether we are on free trial
        const freeTrial = await checkApiLimit();

        const isPro = await checkSubscription();
        

        if(!freeTrial && !isPro ){
            return new NextResponse("Free trial has expired", {status: 403 });
        }
        

        // New
        // const response = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages
        // });
        const response = await openai.images.generate({
           prompt,
           n:parseInt(amount, 10),
           size:resolution,
        });

        if(!isPro){
            await increaseApiLimit();
        }
        
        //  return new NextResponse(JSON.stringify(response.choices[0].message))
        console.log(response.data);
        return NextResponse.json(response.data);   // reponse.data.data
        

    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

































