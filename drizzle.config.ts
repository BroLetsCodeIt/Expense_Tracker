import { defineConfig } from 'drizzle-kit';
import  dotenv from 'dotenv';

dotenv.config();
const link = 'postgresql://lingo_owner:LCojk4RB0nEu@ep-broad-fog-a1rp7aw4.ap-southeast-1.aws.neon.tech/Expenses-Tracker?sslmode=require'

export default defineConfig({
    schema :  "./app/utils/schema.ts",
    dialect : 'postgresql',
    dbCredentials : {
        // url : process.env.NEXT_PUBLIC_DRIZZLE_ORM_URL!,
        url : link , 
    },
    verbose : true , 
    strict : true ,
})

// process.env.DRIZZLE_ORM_URL -- > it may be undefined that's why we should put '!' at the end