import Head from 'next/head';
import Layout from '../components/Layout';

const Services = () => {
  return (
    <Layout>
      <Head>
        <title>Our Services</title>
        <meta name="description" content="Explore the services we offer." />
      </Head>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-center">Our Services</h1>
        <p className="mt-6 text-lg text-center">
          Here you can find all the services we provide, tailored to your needs.
        </p>
      </div>
    </Layout>
  );
};

export default Services;