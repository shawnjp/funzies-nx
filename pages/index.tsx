import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Audhdities</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 py-20">
        <h1 className="text-4xl font-bold text-center">
          Welcome to <a href="https://nextjs.org" className="text-blue-600 hover:underline">Audities</a>
        </h1>

        {isConnected ? (
          <h2 className="text-2xl">You are connected to MongoDB</h2>
        ) : (
          <h2 className="text-2xl">
            You are NOT connected to MongoDB. Check the <code>README.md</code> for instructions.
          </h2>
        )}

        <p className="mt-3 text-center text-lg">
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className="grid">
        <div className="card bg-white hover:bg-gray-50 transition duration-300 ease-in-out shadow-lg hover:shadow-x3 rounded-lg overflow-hidden border border-gray-200">
          <h3 className="text-lg font-semibold p-4 block text-center">Component 1 &rarr;</h3>
          <p className="px-4 pb-4 block text-center">Description 1</p>
        </div>

        <div className="card bg-white hover:bg-gray-50 transition duration-300 ease-in-out shadow-lg hover:shadow-x3 rounded-lg overflow-hidden border border-gray-200">
          <h3 className="text-lg font-semibold p-4 block text-center">Component 2 &rarr;</h3>
          <p className="px-4 pb-4 block text-center">Description 2</p>
        </div>

        <div className="card bg-white hover:bg-gray-50 transition duration-300 ease-in-out shadow-lg hover:shadow-x3 rounded-lg overflow-hidden border border-gray-200">
          <h3 className="text-lg font-semibold p-4 block text-center">Component 3 &rarr;</h3>
          <p className="px-4 pb-4 block text-center">Description 3</p>
        </div>

        <div className="card bg-white hover:bg-gray-50 transition duration-300 ease-in-out shadow-lg hover:shadow-x3 rounded-lg overflow-hidden border border-gray-200">
          <h3 className="text-lg font-semibold p-4 block text-center">Component 4 &rarr;</h3>
          <p className="px-4 pb-4 block text-center">Description 4</p>
        </div>
        </div>
      </main>

      <footer className="w-full h-24 border-t border-gray-200 flex justify-center items-center">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>     
    </div>
  );
}
