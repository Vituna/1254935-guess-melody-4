import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {GameOverScreen} from "./game-over-screen.jsx";

const mockStore = configureStore([]);

it(`Should GameOverScreen render correctly`, () => {
  const store = mockStore();

  const tree = renderer
  .create(
      <Provider store={store}>
        <GameOverScreen
          resetGame={() => {}}
        />
      </Provider>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});

