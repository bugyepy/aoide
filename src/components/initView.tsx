export const InitView: React.FC<{ onClick: () => void }> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
      }}
      onClick={props.onClick}
    >
      <div>
        <img src="aoide.svg" alt="" />
        <br />
        <p>Please Click.</p>
        <p>音声が再生されます。音量に注意してください。</p>
      </div>
    </div>
  );
};
