import { SyncLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <>
      <div
        data-testid="LoadingScreen"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div>
          <SyncLoader
            data-testid="spinner"
            color="rgba(46, 148, 163, 1)"
            margin={3}
            size={30}
          />
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
