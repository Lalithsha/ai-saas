

import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
});

// const instructionMessage = ChatCompletionRequestMessage = {   // ChatCompletionMessage
//     role:"system",
//     content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
// };

// const instructionMessage = OpenAI.Chat.ChatCompletionMessage = {
//     role:"system",
//     content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
// };

const instructionMessage : OpenAI.Chat.ChatCompletionMessage = {
    role:"system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
};




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
            return new NextResponse("Message", { status: 400 });
        }

        // checking whether we are on free trial
        const freeTrial = await checkApiLimit();

        const isPro = await checkSubscription();
        

        if(!freeTrial && !isPro ){
            return new NextResponse("Free trial has expired", {status: 403 });
        }
        
        // New
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages:[instructionMessage,...messages]
        });

        if(!isPro){
            await increaseApiLimit();
        }
        
        //  return new NextResponse(JSON.stringify(response.choices[0].message))
        return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

































