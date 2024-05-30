import Image from "next/image";
import { database } from '@/db/database'
import { bids as bidSchema, items } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/auth";
import { createItemAction } from "./items/create/actions";

export default async function HomePage() {

   const session = await auth();
   
   const allItems = await database.query.items?.findMany();

   if (!session) return <SignIn />;
   const user = session?.user;
   if (!user) return <SignIn />


   return (
      <>
         <main>
             <h2 className="text-2xl font-bold py-5">Items For Sale</h2>
            <div className="grid grid-cols-4 gap-4"> 
               {
                  allItems.map((item) => (
                     <div key={item.id} className="border p-8 rounded-xl">
                        {item.name}
                        starting price: ${item.startingPrice / 100} 
                     </div>
                  ))
               }
            </div>
         </main>
      </>
   );
}
