const dotenv=require("dotenv")
dotenv.config()
const express=require("express")
const cors=require("cors")
const {Resend}=require("resend")

const resend =new Resend(process.env.resend_api)
const app=express()
app.use(cors())
app.use(express.json())
app.post("/sendemail",async (req,res)=>{
    const { name, email, message } = req.body;
    try {
        console.log("formdata", name, email, message)
        await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['preran248@gmail.com'],
        subject: `Message from ${name}`,
        html: `<p>${email}</p>
        <p>${message}</p>   `,
        });
    } catch (error) {
        console.log("error",error)
    }
    res.status(200).json({
        message:"email sent",

    })
})
app.listen(5000,()=>{
    console.log("server is running on port 5000")
})