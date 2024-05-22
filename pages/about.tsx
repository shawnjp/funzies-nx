import Head from 'next/head';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn more about us and our mission." />
      </Head>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-center">About Us</h1>
        <p className="mt-6 text-lg text-center">
          Welcome to our about page. Here you can learn more about our mission, vision, and the team behind our project.
        </p>
      </div>
    </Layout>
  );
};

export default About;