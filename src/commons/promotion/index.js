import React  from 'react';
import {
    Carousel,
    // Navbar,
    // Nav,
    // NavDropdown,
    // NavItem
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import img01 from './images/01.jpg'

export default class Promotion extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }

    render() {

        // let isLogin = () => this.setState({ isLogin: false });
        return (
            <Carousel className="promotion">
                <Carousel.Item>
                     {/*<img width={900} height={500} alt="900x500" src="img01" />*/}
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    {/* <img width={900} height={500} alt="900x500" src="/carousel.png" /> */}
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    {/* <img width={900} height={500} alt="900x500" src="/carousel.png" /> */}
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }
}