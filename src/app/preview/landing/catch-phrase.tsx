const CatchPhrase = (props: { mainText?: string; subText?: string }) => {
  return (
    <div className="max-w-3xl absolute left-0 top-1/3 z-10 bg-black bg-opacity-50 px-20 py-9 text-white font-pretendard rounded-r-2xl">
      <h1 className="text-5xl font-semibold mb-8">
        {getTextWithBreakLine(
          props.mainText ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        )}
      </h1>
      <p className="text-xl font-normal">
        {getTextWithBreakLine(
          props.subText ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        )}
      </p>
    </div>
  );
};

function getTextWithBreakLine(text: string) {
  return text.split("\n").map((str, index) => (
    <span key={index}>
      {str}
      <br />
    </span>
  ));
}

export default CatchPhrase;
