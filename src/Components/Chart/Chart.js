import React, {Component} from 'react'
import {Axes, Bars, PlayPause} from '../index'
import ResponsiveWrapper from '../ResponsiveWrapper/ResponsiveWrapper'
import pigData from '../../wild-pig-data.json'
import {scaleBand, scaleLinear} from 'd3-scale'
import {getMinYear, getParamValue, getMaxYear, getYearsFromData, roundNumberWithTwoDecimals} from '../helper'
import {Line} from 'rc-progress'
import {colors} from '../../config/constants'
import * as qs from 'query-string'

import './style.css'

let graphicMovingInterval

class Chart extends Component {
  constructor(props) {
    super(props)
    this.xScale = scaleBand()
    this.yScale = scaleLinear()
    this.data = pigData['PIG POPULATIONS']
    this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this)

    const howManyYears = getYearsFromData(this.data).length
    const percentPerYear = roundNumberWithTwoDecimals(100/howManyYears)

    this.state = {
      maxYear: getMaxYear(this.data),
      minYear: getMinYear(this.data),
      noMoreData: false,
      progress: percentPerYear,
      percentPerYear
    }
  }

  componentWillMount() {
    const {minYear} = this.state
    const {paused, year} = qs.parse(this.props.location.search)

    /* First check if year has been passed and is an integer */
    const yearParamValue = parseInt(year && getParamValue(year))

    /* If it's a valid year value and more or eq to the minimum year, assign it, otherwise assign minimum year from data */
    /* This is to validate year=2 for example */
    const yearFrom = yearParamValue && (yearParamValue >= minYear) ? yearParamValue : minYear

    /* Paused is a string. If paused is true, set Boolean value true, else set Boolean value false */
    const isPaused = paused ? getParamValue(paused) === 'true' : false
    this.setState({yearFrom, isPaused})
  }

  componentDidMount() {
    const {isPaused} = this.state
    if(isPaused === false) {
      this.startGraphic()
    }
  }

  handlePlayPauseClick() {
    const {isPaused} = this.state
    this.setState({isPaused: !isPaused})
    isPaused
      ? this.startGraphic()
      : this.stopGraphic()
  }

  stopGraphic = () => clearTimeout(graphicMovingInterval)

  startGraphic = () => graphicMovingInterval = setInterval(() => { this.moveGraphicOneYear() }, 2000)


  moveGraphicOneYear() {
    const {yearFrom, maxYear, progress, percentPerYear} = this.state
    if(yearFrom < maxYear) {
      this.setState({yearFrom: this.state.yearFrom + 1, progress: progress + percentPerYear })
    } else {
      this.setState({noMoreData: true, isPaused: true})
      this.stopGraphic()
    }
  }

  render() {
    const {data} = this
    const {parentWidth} = this.props
    const {yearFrom, isPaused, progress} = this.state

    const margins = { top: 10, right: 20, bottom: 100, left: 60 }
    const svgDimensions = { width: parentWidth, height: 500 }

    const filteredDataByYear = data.filter(f => f.year === yearFrom)
    const maxValue = Math.max(...filteredDataByYear.map(d => d.pigPopulation)) + 1000

    // scaleBand type
    const xScale = this.xScale
    .padding(0.5)
    // scaleBand domain should be an array of specific values
    // in our case, we want to use movie titles
    .domain(data.map(d => d.island))
    .range([margins.left, svgDimensions.width - margins.right])

    // scaleLinear type
    const yScale = this.yScale
    // scaleLinear domain required at least two values, min and max
    .domain([0, maxValue])
    .range([svgDimensions.height - margins.bottom, margins.top])

    return (
      <div>
        <h4 style={{textAlign: 'center', marginTop: '40px'}}>Graphic Year: {yearFrom}</h4>
        <svg width={svgDimensions.width} height={svgDimensions.height}>
          <Axes
            scales={{ xScale, yScale }}
            margins={margins}
            svgDimensions={svgDimensions}
          />
          <Bars
            scales={{ xScale, yScale }}
            margins={margins}
            data={filteredDataByYear}
            maxValue={maxValue}
            svgDimensions={svgDimensions}
          />
        </svg>
        <div>
          <PlayPause className="btn-play" text={!isPaused ? 'Pause' : 'Play'} onClick={this.handlePlayPauseClick}/>
          <div className="progress-bar-container">
            <Line percent={progress} strokeWidth="1.5" strokeColor={colors.progress} />
          </div>
        </div>
      </div>

    )
  }
}

export default ResponsiveWrapper(Chart)