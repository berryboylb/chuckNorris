import { lazy, Suspense } from "react";
import React from "react";
import Layout from "../Components/Layout";
import Spinner from "../Components/Spinner";
const Categories = lazy(() => import("../Components/Categories"));
const Jokes = lazy(() => import("../Components/Jokes"));
type Props = {
  setData: any;
  data: {
    category: string;
    background: string;
  };
};

const Landing_page: React.FC<Props> = ({ setData, data }) => {
  return (
    <Layout setData={setData} data={data}>
      <Suspense fallback={<Spinner toggle={false} />}>
        <Categories setData={setData} data={data} />
      </Suspense>
      <Suspense fallback={<Spinner toggle={false} />}>
        <Jokes data={data} />
      </Suspense>
    </Layout>
  );
};

export default Landing_page;
