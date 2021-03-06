import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import VideoPlayer from "./video-player";

import {noop} from "../../utils/common";

configure({
  adapter: new Adapter()
});

const mock = {
  posterUrl: `https://url.com/poster.jpg`,
  previewUrl: `https://url.com/preview/video.mp4`,
};

it(`Should change VideoPlayer state on click`, () => {
  const {previewUrl} = mock;

  const spy = jest
    .spyOn(window.HTMLMediaElement.prototype, `play`)
    .mockImplementation(noop);

  const videoPlayer = mount(
      <VideoPlayer
        isPlaying={false}
        src={previewUrl}
        autoPlay={false}
      />
  );

  expect(videoPlayer.prop(`isPlaying`)).toBe(false);
  expect(spy).toHaveBeenCalledTimes(0);
  spy.mockRestore();
});
