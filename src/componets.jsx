import * as React from "react";

function setFontStyle(width, textLength) {
  const largeColumn = width >= 6;
  const longText = textLength >= 40;
  const shortText = textLength <= 15;

  const sizeAdjuster = () => {
    if (longText && largeColumn) return 1.1;
    if (shortText && largeColumn) return 2;
    if (shortText) return 1.8;
    if (longText) return 0.9;
    return 1;
  };
  const ratio = 10 / 12;
  const size = width * ratio * sizeAdjuster(textLength);
  const styleObj = {
    fontSize: `${size}vw`,
    lineHeight: `${size}vw`
  };
  return styleObj;
}

export default function DisplayRow(props) {
  let startPosition = 1;
  function findGridPlacement(width) {
    const start = startPosition;
    const end = width + startPosition;
    startPosition = end;
    return `col-start-${start} col-end-${end}`;
  }

  const articles = props.columns;
  return (
    <div className={`grid col-gap-2 grid-cols-12 mb-3`}>
      {articles.map((article, i) => {
        const placement = findGridPlacement(article.width);
        return (
          <a
            key={i}
            id="article"
            className={`article cursor-pointer ${placement}`}
            href={article.url}
          >
            <div
              className="w-100 overflow-hidden"
              style={{ maxHeight: "40vh" }}
            >
              <img
                className="object-cover w-full"
                src={article.imageUrl}
                alt={article.title}
              />
            </div>
            <div
              className="hover:underline break-words font-extrabold"
              style={setFontStyle(article.width, article.title.length)}
              children={article.title}
            />
          </a>
        );
      })}
    </div>
  );
}
