import { lazy, Suspense } from "react";
import Navbar from "../Navbar";
import Spinner from "../Spinner";
import Hero from "../Hero";
const Footer = lazy(() => import("../Footer"));
type Props = {
  children: React.ReactNode;
  setData: any;
  data: {
    category: string;
    background: string;
  };
}



const index: React.FC<Props> = ({ children, setData, data }) => {
  return (
    <div>
      <Navbar />
      <Hero setData={setData} data={data} />
      {children}
      <Suspense fallback={<Spinner toggle={false} />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default index;
