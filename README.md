# Hawaiian Pig Visualization
This is a demo project on how to manage React + D3 for data visualization.
While React does the render of SVG elements, D3 will do the heavy calculations.
Enjoy!

## Online Demo:
https://pigdataviz.herokuapp.com/

## Objective:
Using [React](https://reactjs.org/), create an animated bar chart
that shows the data over time.

In the project directory, you'll find
[`wild-pig-data.json`](src/wild-pig-data.json). This file contains imaginary
data about wild pig populations on the various Hawaiian islands recorded over
several years. Your task is to take this data and use React to create an
animated bar chart. The chart should show pig population across islands, with
each separate year of data being shown as a separate frame of the animation.

The chart should have these features:

* [ X ] Animation that steps through the data, displaying each year for 2 seconds
      before proceeding to the next year.

* [ X ] A progress bar that shows the currently displayed year's relationship to
      the other years in the dataset.

* [ X ] A play/pause button which enables and disables the animation, pausing on
      whichever year is currently being shown

* [ X ] Year and play/paused state are persisted as query parameters in the URL.
      For example, `http://localhost:3000/?paused=true&year=2002` should load
      the page with the animation already paused and the year set to 2002

* [ X ] Renders nicely in the most current versions of Firefox, Edge, and Chrome,
      and look good on both desktop and mobile.


## Pending:
[ X ] (FIX) When url has year param, calculate the progress percent and render progress bar from there

[ ] Make progress bar responsive


