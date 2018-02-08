import React from 'react';
import { Grid, Icon, Popup } from 'semantic-ui-react';

const StatsPopup = ({channel}) => {

  const channelStats = channel.stats
  const videoStats = channel.video.stats
  return (
    <Popup 
      basic 
      position='top center'
      flowing
      trigger={
        <Icon link name='bar chart' onClick={this.toggleModal}/>
      } 
      content={
        <Grid width={16} style={{ width: 'auto' }}>
          <Grid.Column>
            <p>This video makes up { ( videoStats.viewCount / channelStats.viewCount * 100 ).toPrecision(3) }% of this channel's total views</p>
            <p>This channel has { ( channelStats.viewCount / channelStats.subscriberCount ).toPrecision(5) } views per channel subscriber</p>
            <p>This video has { ( videoStats.viewCount / channelStats.subscriberCount ).toPrecision(3) } views per channel subscriber</p>
            <p>{ ( videoStats.likeCount / videoStats.viewCount * 100 ).toPrecision(3) }% of viewers liked this video</p>
            <p>{ ( videoStats.dislikeCount / videoStats.viewCount * 100 ).toPrecision(2) }% of viewers disliked this video</p>
          </Grid.Column>
        </Grid>
      }
    />
  )
}

export default StatsPopup;