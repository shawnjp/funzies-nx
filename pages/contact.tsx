import Head from 'next/head';
import Layout from '../components/Layout';

const Contact = () => {
  return (
    <Layout>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Get in touch with us." />
      </Head>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-center">Contact Us</h1>
        <p className="mt-6 text-lg text-center">
          Have any questions? Reach out to us through the following methods.
        </p>
      </div>
    </Layout>
  );
};

export default Contact;