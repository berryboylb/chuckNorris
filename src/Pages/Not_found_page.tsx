import { Suspense, lazy } from "react";
import Spinner from "../Components/Spinner";
const Notfound = lazy(() => import("../Components/Notfound"));
const Not_found_page = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Notfound />
    </Suspense>
  );
};

export default Not_found_page;
