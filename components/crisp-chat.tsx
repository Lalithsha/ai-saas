"use client";

import { useEffect } from "react";
import {Crisp} from "crisp-sdk-web"

export const CrispChat = ()=>{
    useEffect(()=>{
        Crisp.configure
        ("75d6efe1-a79f-46f2-b7c7-a8d6a2422b9a");
    },[])
    
    return null;
}




























