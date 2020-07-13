import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import WinScreen from "./win-screen.jsx";

const mockStore = configureStore([]);

const AVATAR_URL = `https://api.adorable.io/avatars/128`;

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `jazz`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }],
  },
  {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `${AVATAR_URL}/A`,
      artist: `John Snow`,
    }, {
      picture: `${AVATAR_URL}/AB`,
      artist: `Jack Daniels`,
    }, {
      picture: `${AVATAR_URL}/AC`,
      artist: `Jim Beam`,
    }],
  }
];


describe(`Should WinScreen render correctly`, () => {
  const store = mockStore({
    mistakes: 3,
    questions
  });

  describe(`With 3 questions`, () => {
    it(`With 0 mistake`, () => {
      const tree = renderer
        .create(
            <Provider store={store}>
              <WinScreen
                questions={questions}
                mistakes={0}
                onReplayButtonClick={() => {}}
              />
            </Provider>
        )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`With 1 mistake`, () => {
      const tree = renderer
        .create(
            <Provider store={store}>
              <WinScreen
                questions={questions}
                mistakes={1}
                onReplayButtonClick={() => {}}
              />
            </Provider>
        )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`With 2 questions`, () => {
    it(`With 0 mistake`, () => {
      const tree = renderer
        .create(
            <Provider store={store}>
              <WinScreen
                questions={questions}
                mistakes={0}
                onReplayButtonClick={() => {}}
              />
            </Provider>
        )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`With 1 mistake`, () => {
      const tree = renderer
        .create(
            <Provider store={store}>
              <WinScreen
                questions={questions}
                mistakes={1}
                onReplayButtonClick={() => {}}
              />
            </Provider>
        )
      .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
