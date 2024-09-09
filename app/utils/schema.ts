import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";


export const budgets = pgTable("budgets" , {
    id : serial("id").primaryKey(),
    name : varchar("name").notNull(),
    amount : varchar("amount").notNull() , 
    icon : varchar('icon') ,
    createdBy : varchar('createdBy').notNull(),
})



export const expenses  = pgTable("expenses" , { 
    id : serial("id").primaryKey() , 
    ename : varchar("Expense_name").notNull() , 
    amount : numeric("amount").notNull(), 
    budgetId : integer("budgetId").references(() => budgets.id) ,  
    createdAt  : varchar("createdAt").notNull()
})





