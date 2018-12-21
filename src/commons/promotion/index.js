import React from 'react';
import {
  Carousel
} from 'antd';
import PropTypes from 'prop-types';
import img02 from './images/02.jpg';
import img01 from './images/thumb-1920-609614.jpg';
import img03 from './images/thumb-1920-679840.png';
import img04 from './images/thumb-1920-716813.png';

const listImages = [img01, img02, img03, img04];

export default class Promotion extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    return (
      <Carousel autoplay>
        {listImages.map((image, index) => (
          <img src={image} alt={index} key={index} height="400px"/>
          ))}
        {/*<div><h3>Học</h3></div>*/}
        {/*<div><h3>Học nữa</h3></div>*/}
        {/*<div><h3>Học mãi</h3></div>*/}
      </Carousel>
    )
  }
}