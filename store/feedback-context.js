import { createContext, useState } from "react";

export function FeedbackContextProvider(props) {
  const [activeFeedback, setActiveFeedback] = useState();

  function showFeedbackHandler(feedbackData) {
    setActiveFeedback(feedbackData.message);
  }

  function hideFeedbackHandler() {
    setActiveFeedback(null);
  }

  const context = {
    feedback: activeFeedback,
    showFeedback: showFeedbackHandler,
    hideFeedback: hideFeedbackHandler,
  };

  return (
    <FeedbackContext.Provider value={context}>
      {props.children}
    </FeedbackContext.Provider>
  );
}

const FeedbackContext = createContext({
  feedback: null,
  showFeedback: function (feedbackData) {},
  hideFeedback: function () {},
});

export default FeedbackContext;
