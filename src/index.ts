import express , {Request, Response } from 'express';
import userRoutes from './admin/admin-component';
import cors from 'cors'; // Import the 'cors' package

const app = express();
const port = 8081;
app.use(cors());
const defaultFunction = (req: Request , res: Response) =>{
    res.send("Hello World!")
}

const createProfile = (req: Request , res: Response) =>{
    res.send("Product Created!")
}

app.get('/' , defaultFunction);
app.get('/profile', createProfile);

app.use(express.json())
app.use('/product', userRoutes)
app.listen(port , ()=>{
    console.log(`Express API is running at port : ${port}`)
})
