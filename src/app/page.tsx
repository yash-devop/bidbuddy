import Image from "next/image";
import { database } from '@/db/database'
import { bids as bidSchema, items } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/auth";

export default async function HomePage() {

   const session = await auth();
   
   const allItems = await database.query.items?.findMany();

   if (!session) return <SignIn />;
   const user = session?.user;
   if (!user) return <SignIn />


   return (
      <>
         <main className="container mx-auto py-12">
            {
               session ? <SignOut /> : <SignIn />
            }
            {
               session.user ? (
                  <p>{user.name}</p>
               ) : null
            }
            <form action={async (formData: FormData) => {
               "use server"
               //  const bid = formData.get("bid") as string;
               await database.insert(items).values({
                  name: formData.get("name") as string,
                  userId: user.id!
               });
               revalidatePath("/")      // to show the data as soon as we POST our data.
            }}>
               <Input type="text" name="name" placeholder="Name your item" />
               <Button type="submit">Place Bid</Button>
            </form>

            {
               allItems.map((item) => (
                  <div key={item.id}>
                     {item.name}
                  </div>
               ))
            }
         </main>
      </>
   );
}
