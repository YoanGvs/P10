import { Fragment, useEffect, useState } from "react"; // fixed by adding Fragment
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) =>
      new Date(evtA.date) > new Date(evtB.date) ? -1 : 1 // fixed to sort correctly
  );
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < (byDateDesc ? byDateDesc.length - 1 : 0) ? index + 1 : 0), // fixed when byDateDesc function is undefined
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <Fragment key={event.title}>
          <div

            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
              }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

        </Fragment>// fixed by adding Fragment
      ))}<div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((_, radioIdx) => (
            <input
              key={`${_ + radioIdx}`} // fixed because event.id doesn't exist
              type="radio"
              name="radio-button"
              checked={index === radioIdx} // fixed by replacing idx by index
              readOnly // to avoid warning in console
            />
          ))}
        </div>
      </div>


    </div>
  );
};

export default Slider;