import { useState, useEffect } from "react";
import { MoonLoader, BounceLoader } from "react-spinners";
import { useMediaQuery } from "react-responsive";
import Styles from "./css/styles.module.css";
type Props = {
  toggle?: boolean;
};
const Index: React.FC<Props> = ({ toggle }) => {
  const [loading] = useState<boolean>(true);
  const [size, setSize] = useState<number>(30);
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  useEffect(() => {
    if (isMobile) setSize(15);
  }, [isMobile]);
  return (
    <div className={toggle ? Styles.box : Styles.free}>
      {toggle ? (
        <MoonLoader color="#cfb995" loading={loading} size={size} />
      ) : (
        <BounceLoader color="#cfb995" loading={loading} size={size} />
      )}
    </div>
  );
};

Index.defaultProps = {
  toggle: true,
};

export default Index;
