import { lazy, Suspense } from "react";
import Layout from "../Components/Layout";
import Spinner from "../Components/Spinner";
const SinglePage = lazy(() => import("../Components/SinglePage"));
type Props = {
  setData: any;
  data: {
    category: string;
    background: string;
  };
};
const Single_page: React.FC<Props> = ({ setData, data }) => {
  return (
    <Layout setData={setData} data={data}>
      <Suspense fallback={<Spinner />}>
        <SinglePage />
      </Suspense>
    </Layout>
  );
};

export default Single_page;
