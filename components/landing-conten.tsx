"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const testimonials=[
    {
        name:"Vikram Shah",
        avatar: "A",
        title:"Software Engineer",  
        description:"This is the best application I've used!",
    },
    {
        name:"Amit Kumar",
        avatar: "A",
        title:"Associate Software Engineer",  
        description:"Cool Application 😎",
    },
    {
        name:"Priya Pandey",
        avatar: "A",
        title:"Software Engineer",  
        description:"Great AI Saas Product.",
    },
    {
        name:"Daniel",
        avatar: "A",
        title:"Senior Software Engineer",  
        description:"Great Application",
    },
]

export const LandingContent = () =>{
    return(
        <div className="px-10 pb-20" >
           <h2 className="text-center text-4xl text-white font-extrabold mb-10 " >
            Testimonials
           </h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" >
                {testimonials.map((item)=>(
                    <Card key={item.description} className="bg-[#192339] border-none text-white " >
                        <CardHeader  >
                            <CardTitle className="flex items-center gap-x-2 "   >
                                <div>
                                    <p className="text-lg" >{item.name}</p>
                                    <p className="text-zinc-400 text-sm" >{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0" >
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
           </div>
        </div>
    )
}





































