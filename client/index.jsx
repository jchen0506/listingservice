import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';

import Desc from './components/Desc.jsx';
import InfoCards from './components/InfoCards.jsx';
import ContactHost from './components/ContactHost.jsx';
import Host from './components/Host.jsx';

const ListingDiv = styled.div`
  float: left;
  position: relative;
  min-height: 1px;
  padding-left: 10px;
  padding-right: 10px;
  display: block;
  box-sizing: border-box;
  font-weight: 400;
  font-family: "Calibre", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.42;
  color: #333333;
  background-color: white;
`;

const Container = styled.section`
  margin: 0;
  padding-top: 20px;
  border-top: 1px solid #ebebeb;
`;


const Overview = styled.div`
  margin-left: -10px;
  margin-right: -10px;
  display: grid;
  grid-template-columns: 33% 67%;
  padding: 10px;
  grid-row: 2 / 1;
`;

const Cards = styled.div`
  box-sizing: border-box;
  display: block;
`;

const Contact = styled.div`
  margin-top: 10px;
  font-size: 1.8rem;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      site: '',
      mounted: false
    };
  }

  componentDidMount() {
    var state = this;
    var id = window.location.pathname;

    if (state.state.site.id !== id) {
      $.get('/site' + id)
        .then(function(res) {
          state.setState({site: res});
          state.setState({mounted: true});
        }
        );
    }
  }

  render() {
    var state = this;
    if (state.state.mounted) {
      return (
        <ListingDiv>
          <Container>
            <Overview>
              <Host info={state.state.site}/>
              <Desc info={state.state.site}/>
            </Overview>
            <Cards>
              <InfoCards info={state.state.site}/>
            </Cards>
            <Contact>
              <ContactHost info={state.state.site}/>
            </Contact>
          </Container>
          {/* <section>
            <Details/>
          </section>
          <div>
            <Features/>
          </div>
          <section>
            <Vibe/>
          </section> */}
        </ListingDiv>
      );
    } else {
      return null;
    }
  }

}

ReactDOM.render(<App />, document.getElementById('listing'));