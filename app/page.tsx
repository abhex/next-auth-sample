import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default async function Home() {
    const session = await auth();
    return (
        <main className="grow flex items-center justify-center p-4">
            <Card className="max-w-sm">
                <CardHeader>
                    <Image
                        className="rounded-lg"
                        src="https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="img"
                        width={500}
                        height={500}
                        priority
                    />
                </CardHeader>
                <CardContent>
                    <CardTitle className="mb-2 text-2xl font-bold">
                        Welcome {session?.user?.name}!
                    </CardTitle>
                    {session?.user && <p> You are now logged in - {session.user.email} </p>}
                    <p className="text-muted-foreground">
                        Main Dashboard
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}
