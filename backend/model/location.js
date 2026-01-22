const {varchar,integer,numeric,timestamp,pgTable}=require('drizzle-orm/pg-core')

const loc=pgTable("location",{
   location_id:varchar("location_id",{length:20}).primaryKey(),
   area:varchar('area',{lenght:20}),
   state_name:varchar('state_name',{length:20}),
   country_name:varchar('country_name',{length:20}),
   country_code:numeric('country_code'),
   lat:varchar('lat',{length:20}),
   lon:varchar('lon',{lenght:30}),
   created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
   updated_at: timestamp("updated_at", { mode: "date" }).defaultNow() 
})

module.exports={loc}