import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import { database } from '@/db/database'
import { bids as bidSchema, items } from "@/db/schema";
import { createItemAction } from "./actions";

export default async function CreateBid(){
    return (
        <>
           <main>
              <h1 className="text-4xl font-bold py-4">Post an item</h1>
              <form 
                  className="flex flex-col gap-3 border p-8 rounded-xl max-w-lg"
                  action={createItemAction}
               >
                 <Input required className="max-w-lg" type="text" name="name" placeholder="Name your item" />
                 <Input required className="max-w-lg" type="number" name="startingPrice" step={"0.01"} placeholder="What to start your auction at" />
                 <Button className="self-end" type="submit">Place Bid</Button>
              </form>
           </main>
        </>
     );
}