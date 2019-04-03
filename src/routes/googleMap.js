import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class GMap extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <Map google={this.props.google}
           initialCenter={{
             lat: 39.9060115,
             lng: 116.3956187
           }}
           zoom={16.75}
           onClick={this.onMapClicked}>
        <Marker onClick={this.onMarkerClick}
                name={'descripton'}
                position={{lat: 39.9055688, lng: 116.39749}}/>

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h3>{this.state.selectedPlace.name}</h3>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyD0-q1TmYBty8bpPkF-xccc6xDoljOB3Uk")
})(GMap)